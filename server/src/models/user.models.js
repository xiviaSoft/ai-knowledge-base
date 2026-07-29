

export const IUser = {
    id: null,
    name: '',
    email: '',
    password: '',
    avatar: null,
    isVerified: false,
    createdAt: null,
    updatedAt: null,
};

export const WorkSpace = {
    id: null,
    name: '',
    email: null,
    password: null,
    avatar: null,
    isVerified: false,
    createdAt: null,
    updatedAt: null,
};


export const WorkSpaceMember = {
    id: null,
    workspaceId: null,
    userId: null,
    role: 'member',
    joinedAt: null,
};


export const Documents = {
    id: null,
    workspaceId: null,
    uploadedBy: null,
    filename: '',
    type: '',
    status: '',
    createdAt: null,
};


export const DocumentChunks = {
    id: null,
    documentId: null,
    chunkIndex: 0,
    pineconeId: null,
    content: '',
    metadata: null,
};


export const Conversation = {
    id: null,
    workspaceId: null,
    userId: null,
    title: '',
    createdAt: null,
};


export const Messages = {
    id: null,
    conversationId: null,
    role: 'user',
    content: '',
    tokens: 0,
    createdAt: null,
};


export const UsersLogs = {
    id: null,
    workspaceId: null,
    userId: null,
    requestType: '',
    tokensUsed: 0,
    createdAt: null,
};


export const Subscription = {
    id: null,
    workspaceId: null,
    plan: '',
    status: '',
    renewalDate: null,
};