// TypeScript interfaces for van specification models

// Main Specification Category
export interface MainSpecification {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  subSpecifications?: SubSpecification[]; // For joined data
}

// Sub-Specification
export interface SubSpecification {
  id: string;
  main_specification_id: string;
  name: string;
  description: string | null;
  icon: string | null;
  is_required: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  mainSpecification?: MainSpecification; // For joined data
  options?: SpecificationOption[]; // For joined data
}

// Options for Sub-Specifications
export interface SpecificationOption {
  id: string;
  sub_specification_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
  is_default: boolean;
  additional_details: Record<string, unknown> | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  subSpecification?: SubSpecification; // For joined data
}

// Van Build (User Configuration)
export interface VanBuild {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  base_van_model: string | null;
  total_price: number;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
  selections?: VanBuildSelection[]; // For joined data
}

// Selected Options for Van Builds
export interface VanBuildSelection {
  id: string;
  van_build_id: string;
  option_id: string;
  custom_price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  option?: SpecificationOption; // For joined data
  vanBuild?: VanBuild; // For joined data
}

// Database definition (for use with Supabase)
export type Database = {
  public: {
    Tables: {
      main_specifications: {
        Row: MainSpecification;
        Insert: Omit<MainSpecification, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MainSpecification, 'id' | 'created_at' | 'updated_at'>>;
      };
      sub_specifications: {
        Row: SubSpecification;
        Insert: Omit<SubSpecification, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SubSpecification, 'id' | 'created_at' | 'updated_at'>>;
      };
      specification_options: {
        Row: SpecificationOption;
        Insert: Omit<SpecificationOption, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SpecificationOption, 'id' | 'created_at' | 'updated_at'>>;
      };
      van_builds: {
        Row: VanBuild;
        Insert: Omit<VanBuild, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<VanBuild, 'id' | 'created_at' | 'updated_at'>>;
      };
      van_build_selections: {
        Row: VanBuildSelection;
        Insert: Omit<VanBuildSelection, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<VanBuildSelection, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
