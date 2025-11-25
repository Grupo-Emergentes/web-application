import { requester } from '../../../services/Requester';

class WalletService {
    private requester: typeof requester;

    constructor() {
        this.requester = requester;
    }
    
    async getDniByUserId(userId: number) {
        return this.requester.get(`/dni/${userId}`);
    }
}

const walletService = new WalletService();
export { walletService };