export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          slug: string
          summary: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug: string
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug?: string
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          submitted_at: string | null
        }
        Insert: {
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          submitted_at?: string | null
        }
        Update: {
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string | null
          full_description: string
          id: string
          image_url: string | null
          slug: string
          summary: string
          target_audience: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_description: string
          id?: string
          image_url?: string | null
          slug: string
          summary: string
          target_audience?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_description?: string
          id?: string
          image_url?: string | null
          slug?: string
          summary?: string
          target_audience?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          image_url: string
          name: string
          specialties: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          name: string
          specialties?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          name?: string
          specialties?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          course_taken_id: string | null
          created_at: string | null
          id: string
          quote: string
          student_image_url: string | null
          student_name: string
          updated_at: string | null
        }
        Insert: {
          course_taken_id?: string | null
          created_at?: string | null
          id?: string
          quote: string
          student_image_url?: string | null
          student_name: string
          updated_at?: string | null
        }
        Update: {
          course_taken_id?: string | null
          created_at?: string | null
          id?: string
          quote?: string
          student_image_url?: string | null
          student_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_course_taken_id_fkey"
            columns: ["course_taken_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
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
      contact_status: "NEW" | "READ" | "ARCHIVED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contact_status: ["NEW", "READ", "ARCHIVED"],
    },
  },
} as const
