// Prisma 타입 재export
export type {
    User,
    Workspace,
    WorkspaceMember,
    Page,
    Block,
    PagePermission,
    Comment,
    Mention,
    WorkspaceMemberRole,
    BlockType,
    PermissionLevel,
  } from '@prisma/client';
  
  // DTO (Data Transfer Object) 타입 정의
  
  // 사용자 관련
  export interface CreateUserDto {
    user_email: string;
    user_password: string;
    user_name: string;
  }
  
  export interface LoginDto {
    user_email: string;
    user_password: string;
  }
  
  export interface UpdateUserDto {
    user_name?: string;
    user_avatar_url?: string;
  }
  
  // 워크스페이스 관련
  export interface CreateWorkspaceDto {
    workspace_name: string;
    workspace_icon?: string;
  }
  
  export interface UpdateWorkspaceDto {
    workspace_name?: string;
    workspace_icon?: string;
  }
  
  // 페이지 관련
  export interface CreatePageDto {
    page_workspace_id: string;
    page_parent_id?: string;
    page_title: string;
    page_icon?: string;
  }
  
  export interface UpdatePageDto {
    page_title?: string;
    page_icon?: string;
    page_cover_image?: string;
    page_position?: number;
  }
  
  // 블록 관련
  export interface CreateBlockDto {
    block_page_id: string;
    block_type: 'TEXT' | 'HEADING' | 'LIST' | 'CODE' | 'IMAGE';
    block_content: any;
    block_position: number;
  }
  
  export interface UpdateBlockDto {
    block_type?: 'TEXT' | 'HEADING' | 'LIST' | 'CODE' | 'IMAGE';
    block_content?: any;
    block_position?: number;
  }
  
  // 댓글 관련
  export interface CreateCommentDto {
    comment_page_id: string;
    comment_block_id?: string;
    comment_content: string;
    comment_parent_comment_id?: string;
  }
  
  export interface UpdateCommentDto {
    comment_content: string;
  }
  
  // API 응답 타입
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  // 페이지네이션
  export interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }