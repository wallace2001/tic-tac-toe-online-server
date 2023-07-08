import { Server } from "socket.io";
import { checkGameState } from "./util/check-game-winner";
import { ICallbackJoin, IMoveGame, User } from "./types";

export default (httpServer: any) => {
    const io = new Server(httpServer, { 
        cors: {
            origin: "*"
        },
     });
     
     io.on('connection', (socket, ) => {
        socket.on("join_game", async (data: User, callback: ICallbackJoin) => {
            const connectedSockets = io.sockets.adapter.rooms.get(data.roomJoined);
            const socketRooms = Array.from(socket.rooms.values()).filter(r => r !== socket.id);

            callback = typeof callback == "function" ? callback : () => {};

            if (socketRooms.length > 0 || connectedSockets && connectedSockets.size == 2) {
                socket.emit("room_join_error", {
                    error: "Room is full please choose another room to play"
                });
            } else {
                await socket.join(data.roomJoined);
                socket.emit("room_joined");

                if (io.sockets.adapter.rooms.get(data.roomJoined)?.size === 2) {
                    socket.to(data.roomJoined).emit("start_game", { start: true, symbol: 'x' });
                    callback({start: true});
                } else {
                    callback({start:false});
                }
            }
        });

        socket.on("winner", async ({matrix, user}: IMoveGame) => {
            const hasWinner = checkGameState(matrix);

            if (hasWinner) {
                socket.to(user.roomJoined).emit("on_winner", hasWinner);
            }
        });

        socket.on("update_game", async (message: IMoveGame) => {
            const socketRooms = Array.from(socket.rooms.values()).filter(r => r !== socket.id);
            const gameRoom = socketRooms && socketRooms[0];

            socket.to(gameRoom).emit("on_game_update", {...message, turn: true, symbol: message.symbol === 'x' ? 'o' : 'x'});
        });
     });

     return io;
}