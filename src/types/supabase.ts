
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      caller_rules: {
        Row: {
          contact_name: string
          created_at: string
          id: string
          phone_number: string
          priority: number
          sound_mode: string
          user_id: string
        }
        Insert: {
          contact_name: string
          created_at?: string
          id?: string
          phone_number: string
          priority?: number
          sound_mode: string
          user_id: string
        }
        Update: {
          contact_name?: string
          created_at?: string
          id?: string
          phone_number?: string
          priority?: number
          sound_mode?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "caller_rules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      location_rules: {
        Row: {
          created_at: string
          id: string
          latitude: number
          location_name: string
          longitude: number
          radius: number
          sound_mode: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          latitude: number
          location_name: string
          longitude: number
          radius?: number
          sound_mode: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number
          location_name?: string
          longitude?: number
          radius?: number
          sound_mode?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_rules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      ml_predictions: {
        Row: {
          created_at: string
          id: string
          input_data: Json
          predicted_mode: string
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_data?: Json
          predicted_mode: string
          timestamp: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          input_data?: Json
          predicted_mode?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ml_predictions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sound_rules: {
        Row: {
          active: boolean
          conditions: Json
          created_at: string
          id: string
          name: string
          sound_mode: string
          type: string
          user_id: string
        }
        Insert: {
          active?: boolean
          conditions?: Json
          created_at?: string
          id?: string
          name: string
          sound_mode: string
          type: string
          user_id: string
        }
        Update: {
          active?: boolean
          conditions?: Json
          created_at?: string
          id?: string
          name?: string
          sound_mode?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sound_rules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      time_rules: {
        Row: {
          created_at: string
          days: number[]
          end_time: string
          id: string
          sound_mode: string
          start_time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days: number[]
          end_time: string
          id?: string
          sound_mode: string
          start_time: string
          user_id: string
        }
        Update: {
          created_at?: string
          days?: number[]
          end_time?: string
          id?: string
          sound_mode?: string
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_rules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preferences: {
        Row: {
          allow_learning: boolean
          created_at: string
          default_mode: string
          emergency_contacts: string[]
          id: string
          notifications_enabled: boolean
          user_id: string
        }
        Insert: {
          allow_learning?: boolean
          created_at?: string
          default_mode?: string
          emergency_contacts?: string[]
          id?: string
          notifications_enabled?: boolean
          user_id: string
        }
        Update: {
          allow_learning?: boolean
          created_at?: string
          default_mode?: string
          emergency_contacts?: string[]
          id?: string
          notifications_enabled?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
