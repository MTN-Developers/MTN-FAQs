export interface CourseMetaData {
  id: string;
  course_name_en: string;
  course_name_ar: string;
  slug: string;
  course_logo: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface CourseFaq {
  id: string;
  title: string;
  question: string;
  answer: string;
  course_meta_data_id: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}
