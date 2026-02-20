/**
 * @validiant/shared
 *
 * Shared types, enums, and response wrappers used across the monorepo.
 * Will be expanded in Phase 3 as DB schema is defined.
 */

// ─── API Response Wrappers ───────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

// ─── Enums (expanded in Phase 3) ─────────────────────────────────────────────

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export type UserRole = 'admin' | 'manager' | 'employee';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
