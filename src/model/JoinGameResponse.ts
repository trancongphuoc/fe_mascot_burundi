interface JoinGameResponse {
    status: string;
    message: string;
    data?: {
      user: User;
    };
  }