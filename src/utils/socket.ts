import io, { Socket } from "socket.io-client";

class AppSocket {
    private established: boolean;
    private client: Socket;

    constructor() {
        this.established = false;
        
        // @ts-ignore
        this.client = io(process.env.REACT_APP_SOCKET_URL, { autoConnect: false });

        // Handlers
        this.client.on('connect_error', this.OnConnectError);
        this.client.on('connect', this.OnConnect);
        this.client.on('disconnect', this.OnDisconnect);
    }

    Connect(): boolean {
        if(this.established) return false;

        this.client.connect();
        this.established = true;

        return true;
    }

    OnConnect() {
        console.log('Connected');
    }

    OnDisconnect(reason: string) {
        console.log('Disconnected');
    }

    OnConnectError(error: Error) {
        console.log(error.message);
    }
}

export default new AppSocket();