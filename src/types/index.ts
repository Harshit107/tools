export interface Website {
  id: string;
  title: string;
  url: string;
  folderId: string;
  favicon?: string;
  createdAt: string | number;
  username?: string;
  encryptedPassword?: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  createdAt: string | number;
}
