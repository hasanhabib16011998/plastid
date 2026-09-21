import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pia_leads_source" AS ENUM('homepage', 'contact', 'other');
  CREATE TYPE "public"."enum_pia_leads_status" AS ENUM('new', 'contacted', 'closed', 'archived');
  CREATE TYPE "public"."enum_sre_testimonials_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_pd_testimonials_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_pcd_testimonials_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TABLE "tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"domain" varchar,
  	"preview_domain" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_super_admin" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "pia_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'plastid-interior',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pia_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_background_image_id" integer,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_projects_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pia_projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pia_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"thumbnail_id" integer,
  	"category" varchar,
  	"description" jsonb,
  	"client" varchar,
  	"location" varchar,
  	"area" varchar,
  	"duration" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"year" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pia_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_id" integer,
  	"short_description" varchar,
  	"description" jsonb,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"company" varchar,
  	"photo_id" integer,
  	"quote" varchar NOT NULL,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"service" varchar,
  	"message" varchar,
  	"source" "enum_pia_leads_source" DEFAULT 'homepage',
  	"status" "enum_pia_leads_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pia_blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"author_id" integer,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pia_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"is_external" boolean DEFAULT false
  );
  
  CREATE TABLE "pia_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pia_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"footer_tagline" varchar,
  	"footer_copyright_text" varchar,
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_youtube" varchar,
  	"social_links_twitter" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"contact_info_address" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'sun-real-estate',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "sre_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_background_image_id" integer,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_projects_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "sre_projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "sre_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"thumbnail_id" integer,
  	"category" varchar,
  	"description" jsonb,
  	"client" varchar,
  	"location" varchar,
  	"area" varchar,
  	"duration" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"year" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "sre_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_id" integer,
  	"short_description" varchar,
  	"description" jsonb,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"company" varchar,
  	"photo_id" integer,
  	"quote" varchar NOT NULL,
  	"rating" "enum_sre_testimonials_rating" DEFAULT '5',
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "sre_blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"author_id" integer,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sre_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"is_external" boolean DEFAULT false
  );
  
  CREATE TABLE "sre_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "sre_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"footer_tagline" varchar,
  	"footer_copyright_text" varchar,
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_youtube" varchar,
  	"social_links_twitter" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"contact_info_address" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'plastid-digital',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pd_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_background_image_id" integer,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_projects_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pd_projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pd_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"thumbnail_id" integer,
  	"category" varchar,
  	"description" jsonb,
  	"client" varchar,
  	"location" varchar,
  	"area" varchar,
  	"duration" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"year" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pd_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_id" integer,
  	"short_description" varchar,
  	"description" jsonb,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"company" varchar,
  	"photo_id" integer,
  	"quote" varchar NOT NULL,
  	"rating" "enum_pd_testimonials_rating" DEFAULT '5',
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pd_blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"author_id" integer,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pd_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"is_external" boolean DEFAULT false
  );
  
  CREATE TABLE "pd_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pd_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"footer_tagline" varchar,
  	"footer_copyright_text" varchar,
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_youtube" varchar,
  	"social_links_twitter" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"contact_info_address" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'plastid-construction',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pcd_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_background_image_id" integer,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_projects_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pcd_projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pcd_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"thumbnail_id" integer,
  	"category" varchar,
  	"description" jsonb,
  	"client" varchar,
  	"location" varchar,
  	"area" varchar,
  	"duration" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"year" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pcd_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_id" integer,
  	"short_description" varchar,
  	"description" jsonb,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"company" varchar,
  	"photo_id" integer,
  	"quote" varchar NOT NULL,
  	"rating" "enum_pcd_testimonials_rating" DEFAULT '5',
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pcd_blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"author_id" integer,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pcd_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"is_external" boolean DEFAULT false
  );
  
  CREATE TABLE "pcd_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pcd_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"footer_tagline" varchar,
  	"footer_copyright_text" varchar,
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_youtube" varchar,
  	"social_links_twitter" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"contact_info_address" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer,
  	"users_id" integer,
  	"pia_media_id" integer,
  	"pia_pages_id" integer,
  	"pia_projects_id" integer,
  	"pia_services_id" integer,
  	"pia_team_id" integer,
  	"pia_testimonials_id" integer,
  	"pia_leads_id" integer,
  	"pia_blog_id" integer,
  	"pia_settings_id" integer,
  	"sre_media_id" integer,
  	"sre_pages_id" integer,
  	"sre_projects_id" integer,
  	"sre_services_id" integer,
  	"sre_team_id" integer,
  	"sre_testimonials_id" integer,
  	"sre_blog_id" integer,
  	"sre_settings_id" integer,
  	"pd_media_id" integer,
  	"pd_pages_id" integer,
  	"pd_projects_id" integer,
  	"pd_services_id" integer,
  	"pd_team_id" integer,
  	"pd_testimonials_id" integer,
  	"pd_blog_id" integer,
  	"pd_settings_id" integer,
  	"pcd_media_id" integer,
  	"pcd_pages_id" integer,
  	"pcd_projects_id" integer,
  	"pcd_services_id" integer,
  	"pcd_team_id" integer,
  	"pcd_testimonials_id" integer,
  	"pcd_blog_id" integer,
  	"pcd_settings_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_pages" ADD CONSTRAINT "pia_pages_hero_background_image_id_pia_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_pages" ADD CONSTRAINT "pia_pages_seo_og_image_id_pia_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_projects_images" ADD CONSTRAINT "pia_projects_images_image_id_pia_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_projects_images" ADD CONSTRAINT "pia_projects_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pia_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_projects_tags" ADD CONSTRAINT "pia_projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pia_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_projects" ADD CONSTRAINT "pia_projects_thumbnail_id_pia_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_projects" ADD CONSTRAINT "pia_projects_seo_og_image_id_pia_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_services_features" ADD CONSTRAINT "pia_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pia_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_services" ADD CONSTRAINT "pia_services_icon_id_pia_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_team" ADD CONSTRAINT "pia_team_photo_id_pia_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_testimonials" ADD CONSTRAINT "pia_testimonials_photo_id_pia_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_blog_tags" ADD CONSTRAINT "pia_blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pia_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_blog" ADD CONSTRAINT "pia_blog_author_id_pia_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."pia_team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_blog" ADD CONSTRAINT "pia_blog_cover_image_id_pia_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_blog" ADD CONSTRAINT "pia_blog_seo_og_image_id_pia_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_settings_nav" ADD CONSTRAINT "pia_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pia_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_settings_footer_links" ADD CONSTRAINT "pia_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pia_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pia_settings" ADD CONSTRAINT "pia_settings_logo_id_pia_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_settings" ADD CONSTRAINT "pia_settings_favicon_id_pia_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pia_settings" ADD CONSTRAINT "pia_settings_seo_og_image_id_pia_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pia_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_pages" ADD CONSTRAINT "sre_pages_hero_background_image_id_sre_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_pages" ADD CONSTRAINT "sre_pages_seo_og_image_id_sre_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_projects_images" ADD CONSTRAINT "sre_projects_images_image_id_sre_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_projects_images" ADD CONSTRAINT "sre_projects_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sre_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sre_projects_tags" ADD CONSTRAINT "sre_projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sre_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sre_projects" ADD CONSTRAINT "sre_projects_thumbnail_id_sre_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_projects" ADD CONSTRAINT "sre_projects_seo_og_image_id_sre_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_services_features" ADD CONSTRAINT "sre_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sre_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sre_services" ADD CONSTRAINT "sre_services_icon_id_sre_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_team" ADD CONSTRAINT "sre_team_photo_id_sre_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_testimonials" ADD CONSTRAINT "sre_testimonials_photo_id_sre_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_blog_tags" ADD CONSTRAINT "sre_blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sre_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sre_blog" ADD CONSTRAINT "sre_blog_author_id_sre_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."sre_team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_blog" ADD CONSTRAINT "sre_blog_cover_image_id_sre_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_blog" ADD CONSTRAINT "sre_blog_seo_og_image_id_sre_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_settings_nav" ADD CONSTRAINT "sre_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sre_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sre_settings_footer_links" ADD CONSTRAINT "sre_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sre_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sre_settings" ADD CONSTRAINT "sre_settings_logo_id_sre_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_settings" ADD CONSTRAINT "sre_settings_favicon_id_sre_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sre_settings" ADD CONSTRAINT "sre_settings_seo_og_image_id_sre_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."sre_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_pages" ADD CONSTRAINT "pd_pages_hero_background_image_id_pd_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_pages" ADD CONSTRAINT "pd_pages_seo_og_image_id_pd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_projects_images" ADD CONSTRAINT "pd_projects_images_image_id_pd_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_projects_images" ADD CONSTRAINT "pd_projects_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pd_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pd_projects_tags" ADD CONSTRAINT "pd_projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pd_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pd_projects" ADD CONSTRAINT "pd_projects_thumbnail_id_pd_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_projects" ADD CONSTRAINT "pd_projects_seo_og_image_id_pd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_services_features" ADD CONSTRAINT "pd_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pd_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pd_services" ADD CONSTRAINT "pd_services_icon_id_pd_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_team" ADD CONSTRAINT "pd_team_photo_id_pd_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_testimonials" ADD CONSTRAINT "pd_testimonials_photo_id_pd_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_blog_tags" ADD CONSTRAINT "pd_blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pd_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pd_blog" ADD CONSTRAINT "pd_blog_author_id_pd_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."pd_team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_blog" ADD CONSTRAINT "pd_blog_cover_image_id_pd_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_blog" ADD CONSTRAINT "pd_blog_seo_og_image_id_pd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_settings_nav" ADD CONSTRAINT "pd_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pd_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pd_settings_footer_links" ADD CONSTRAINT "pd_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pd_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pd_settings" ADD CONSTRAINT "pd_settings_logo_id_pd_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_settings" ADD CONSTRAINT "pd_settings_favicon_id_pd_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pd_settings" ADD CONSTRAINT "pd_settings_seo_og_image_id_pd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_pages" ADD CONSTRAINT "pcd_pages_hero_background_image_id_pcd_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_pages" ADD CONSTRAINT "pcd_pages_seo_og_image_id_pcd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_projects_images" ADD CONSTRAINT "pcd_projects_images_image_id_pcd_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_projects_images" ADD CONSTRAINT "pcd_projects_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcd_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcd_projects_tags" ADD CONSTRAINT "pcd_projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcd_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcd_projects" ADD CONSTRAINT "pcd_projects_thumbnail_id_pcd_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_projects" ADD CONSTRAINT "pcd_projects_seo_og_image_id_pcd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_services_features" ADD CONSTRAINT "pcd_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcd_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcd_services" ADD CONSTRAINT "pcd_services_icon_id_pcd_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_team" ADD CONSTRAINT "pcd_team_photo_id_pcd_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_testimonials" ADD CONSTRAINT "pcd_testimonials_photo_id_pcd_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_blog_tags" ADD CONSTRAINT "pcd_blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcd_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcd_blog" ADD CONSTRAINT "pcd_blog_author_id_pcd_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."pcd_team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_blog" ADD CONSTRAINT "pcd_blog_cover_image_id_pcd_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_blog" ADD CONSTRAINT "pcd_blog_seo_og_image_id_pcd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_settings_nav" ADD CONSTRAINT "pcd_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcd_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcd_settings_footer_links" ADD CONSTRAINT "pcd_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcd_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcd_settings" ADD CONSTRAINT "pcd_settings_logo_id_pcd_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_settings" ADD CONSTRAINT "pcd_settings_favicon_id_pcd_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcd_settings" ADD CONSTRAINT "pcd_settings_seo_og_image_id_pcd_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."pcd_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_media_fk" FOREIGN KEY ("pia_media_id") REFERENCES "public"."pia_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_pages_fk" FOREIGN KEY ("pia_pages_id") REFERENCES "public"."pia_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_projects_fk" FOREIGN KEY ("pia_projects_id") REFERENCES "public"."pia_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_services_fk" FOREIGN KEY ("pia_services_id") REFERENCES "public"."pia_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_team_fk" FOREIGN KEY ("pia_team_id") REFERENCES "public"."pia_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_testimonials_fk" FOREIGN KEY ("pia_testimonials_id") REFERENCES "public"."pia_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_leads_fk" FOREIGN KEY ("pia_leads_id") REFERENCES "public"."pia_leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_blog_fk" FOREIGN KEY ("pia_blog_id") REFERENCES "public"."pia_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pia_settings_fk" FOREIGN KEY ("pia_settings_id") REFERENCES "public"."pia_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_media_fk" FOREIGN KEY ("sre_media_id") REFERENCES "public"."sre_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_pages_fk" FOREIGN KEY ("sre_pages_id") REFERENCES "public"."sre_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_projects_fk" FOREIGN KEY ("sre_projects_id") REFERENCES "public"."sre_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_services_fk" FOREIGN KEY ("sre_services_id") REFERENCES "public"."sre_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_team_fk" FOREIGN KEY ("sre_team_id") REFERENCES "public"."sre_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_testimonials_fk" FOREIGN KEY ("sre_testimonials_id") REFERENCES "public"."sre_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_blog_fk" FOREIGN KEY ("sre_blog_id") REFERENCES "public"."sre_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sre_settings_fk" FOREIGN KEY ("sre_settings_id") REFERENCES "public"."sre_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_media_fk" FOREIGN KEY ("pd_media_id") REFERENCES "public"."pd_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_pages_fk" FOREIGN KEY ("pd_pages_id") REFERENCES "public"."pd_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_projects_fk" FOREIGN KEY ("pd_projects_id") REFERENCES "public"."pd_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_services_fk" FOREIGN KEY ("pd_services_id") REFERENCES "public"."pd_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_team_fk" FOREIGN KEY ("pd_team_id") REFERENCES "public"."pd_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_testimonials_fk" FOREIGN KEY ("pd_testimonials_id") REFERENCES "public"."pd_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_blog_fk" FOREIGN KEY ("pd_blog_id") REFERENCES "public"."pd_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pd_settings_fk" FOREIGN KEY ("pd_settings_id") REFERENCES "public"."pd_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_media_fk" FOREIGN KEY ("pcd_media_id") REFERENCES "public"."pcd_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_pages_fk" FOREIGN KEY ("pcd_pages_id") REFERENCES "public"."pcd_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_projects_fk" FOREIGN KEY ("pcd_projects_id") REFERENCES "public"."pcd_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_services_fk" FOREIGN KEY ("pcd_services_id") REFERENCES "public"."pcd_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_team_fk" FOREIGN KEY ("pcd_team_id") REFERENCES "public"."pcd_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_testimonials_fk" FOREIGN KEY ("pcd_testimonials_id") REFERENCES "public"."pcd_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_blog_fk" FOREIGN KEY ("pcd_blog_id") REFERENCES "public"."pcd_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pcd_settings_fk" FOREIGN KEY ("pcd_settings_id") REFERENCES "public"."pcd_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_tenants_id_idx" ON "users_rels" USING btree ("tenants_id");
  CREATE INDEX "pia_media_updated_at_idx" ON "pia_media" USING btree ("updated_at");
  CREATE INDEX "pia_media_created_at_idx" ON "pia_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "pia_media_filename_idx" ON "pia_media" USING btree ("filename");
  CREATE UNIQUE INDEX "pia_pages_slug_idx" ON "pia_pages" USING btree ("slug");
  CREATE INDEX "pia_pages_hero_hero_background_image_idx" ON "pia_pages" USING btree ("hero_background_image_id");
  CREATE INDEX "pia_pages_seo_seo_og_image_idx" ON "pia_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pia_pages_updated_at_idx" ON "pia_pages" USING btree ("updated_at");
  CREATE INDEX "pia_pages_created_at_idx" ON "pia_pages" USING btree ("created_at");
  CREATE INDEX "pia_projects_images_order_idx" ON "pia_projects_images" USING btree ("_order");
  CREATE INDEX "pia_projects_images_parent_id_idx" ON "pia_projects_images" USING btree ("_parent_id");
  CREATE INDEX "pia_projects_images_image_idx" ON "pia_projects_images" USING btree ("image_id");
  CREATE INDEX "pia_projects_tags_order_idx" ON "pia_projects_tags" USING btree ("_order");
  CREATE INDEX "pia_projects_tags_parent_id_idx" ON "pia_projects_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pia_projects_slug_idx" ON "pia_projects" USING btree ("slug");
  CREATE INDEX "pia_projects_thumbnail_idx" ON "pia_projects" USING btree ("thumbnail_id");
  CREATE INDEX "pia_projects_seo_seo_og_image_idx" ON "pia_projects" USING btree ("seo_og_image_id");
  CREATE INDEX "pia_projects_updated_at_idx" ON "pia_projects" USING btree ("updated_at");
  CREATE INDEX "pia_projects_created_at_idx" ON "pia_projects" USING btree ("created_at");
  CREATE INDEX "pia_services_features_order_idx" ON "pia_services_features" USING btree ("_order");
  CREATE INDEX "pia_services_features_parent_id_idx" ON "pia_services_features" USING btree ("_parent_id");
  CREATE INDEX "pia_services_icon_idx" ON "pia_services" USING btree ("icon_id");
  CREATE INDEX "pia_services_updated_at_idx" ON "pia_services" USING btree ("updated_at");
  CREATE INDEX "pia_services_created_at_idx" ON "pia_services" USING btree ("created_at");
  CREATE INDEX "pia_team_photo_idx" ON "pia_team" USING btree ("photo_id");
  CREATE INDEX "pia_team_updated_at_idx" ON "pia_team" USING btree ("updated_at");
  CREATE INDEX "pia_team_created_at_idx" ON "pia_team" USING btree ("created_at");
  CREATE INDEX "pia_testimonials_photo_idx" ON "pia_testimonials" USING btree ("photo_id");
  CREATE INDEX "pia_testimonials_updated_at_idx" ON "pia_testimonials" USING btree ("updated_at");
  CREATE INDEX "pia_testimonials_created_at_idx" ON "pia_testimonials" USING btree ("created_at");
  CREATE INDEX "pia_leads_updated_at_idx" ON "pia_leads" USING btree ("updated_at");
  CREATE INDEX "pia_leads_created_at_idx" ON "pia_leads" USING btree ("created_at");
  CREATE INDEX "pia_blog_tags_order_idx" ON "pia_blog_tags" USING btree ("_order");
  CREATE INDEX "pia_blog_tags_parent_id_idx" ON "pia_blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pia_blog_slug_idx" ON "pia_blog" USING btree ("slug");
  CREATE INDEX "pia_blog_author_idx" ON "pia_blog" USING btree ("author_id");
  CREATE INDEX "pia_blog_cover_image_idx" ON "pia_blog" USING btree ("cover_image_id");
  CREATE INDEX "pia_blog_seo_seo_og_image_idx" ON "pia_blog" USING btree ("seo_og_image_id");
  CREATE INDEX "pia_blog_updated_at_idx" ON "pia_blog" USING btree ("updated_at");
  CREATE INDEX "pia_blog_created_at_idx" ON "pia_blog" USING btree ("created_at");
  CREATE INDEX "pia_settings_nav_order_idx" ON "pia_settings_nav" USING btree ("_order");
  CREATE INDEX "pia_settings_nav_parent_id_idx" ON "pia_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "pia_settings_footer_links_order_idx" ON "pia_settings_footer_links" USING btree ("_order");
  CREATE INDEX "pia_settings_footer_links_parent_id_idx" ON "pia_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "pia_settings_logo_idx" ON "pia_settings" USING btree ("logo_id");
  CREATE INDEX "pia_settings_favicon_idx" ON "pia_settings" USING btree ("favicon_id");
  CREATE INDEX "pia_settings_seo_seo_og_image_idx" ON "pia_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "pia_settings_updated_at_idx" ON "pia_settings" USING btree ("updated_at");
  CREATE INDEX "pia_settings_created_at_idx" ON "pia_settings" USING btree ("created_at");
  CREATE INDEX "sre_media_updated_at_idx" ON "sre_media" USING btree ("updated_at");
  CREATE INDEX "sre_media_created_at_idx" ON "sre_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "sre_media_filename_idx" ON "sre_media" USING btree ("filename");
  CREATE UNIQUE INDEX "sre_pages_slug_idx" ON "sre_pages" USING btree ("slug");
  CREATE INDEX "sre_pages_hero_hero_background_image_idx" ON "sre_pages" USING btree ("hero_background_image_id");
  CREATE INDEX "sre_pages_seo_seo_og_image_idx" ON "sre_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "sre_pages_updated_at_idx" ON "sre_pages" USING btree ("updated_at");
  CREATE INDEX "sre_pages_created_at_idx" ON "sre_pages" USING btree ("created_at");
  CREATE INDEX "sre_projects_images_order_idx" ON "sre_projects_images" USING btree ("_order");
  CREATE INDEX "sre_projects_images_parent_id_idx" ON "sre_projects_images" USING btree ("_parent_id");
  CREATE INDEX "sre_projects_images_image_idx" ON "sre_projects_images" USING btree ("image_id");
  CREATE INDEX "sre_projects_tags_order_idx" ON "sre_projects_tags" USING btree ("_order");
  CREATE INDEX "sre_projects_tags_parent_id_idx" ON "sre_projects_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sre_projects_slug_idx" ON "sre_projects" USING btree ("slug");
  CREATE INDEX "sre_projects_thumbnail_idx" ON "sre_projects" USING btree ("thumbnail_id");
  CREATE INDEX "sre_projects_seo_seo_og_image_idx" ON "sre_projects" USING btree ("seo_og_image_id");
  CREATE INDEX "sre_projects_updated_at_idx" ON "sre_projects" USING btree ("updated_at");
  CREATE INDEX "sre_projects_created_at_idx" ON "sre_projects" USING btree ("created_at");
  CREATE INDEX "sre_services_features_order_idx" ON "sre_services_features" USING btree ("_order");
  CREATE INDEX "sre_services_features_parent_id_idx" ON "sre_services_features" USING btree ("_parent_id");
  CREATE INDEX "sre_services_icon_idx" ON "sre_services" USING btree ("icon_id");
  CREATE INDEX "sre_services_updated_at_idx" ON "sre_services" USING btree ("updated_at");
  CREATE INDEX "sre_services_created_at_idx" ON "sre_services" USING btree ("created_at");
  CREATE INDEX "sre_team_photo_idx" ON "sre_team" USING btree ("photo_id");
  CREATE INDEX "sre_team_updated_at_idx" ON "sre_team" USING btree ("updated_at");
  CREATE INDEX "sre_team_created_at_idx" ON "sre_team" USING btree ("created_at");
  CREATE INDEX "sre_testimonials_photo_idx" ON "sre_testimonials" USING btree ("photo_id");
  CREATE INDEX "sre_testimonials_updated_at_idx" ON "sre_testimonials" USING btree ("updated_at");
  CREATE INDEX "sre_testimonials_created_at_idx" ON "sre_testimonials" USING btree ("created_at");
  CREATE INDEX "sre_blog_tags_order_idx" ON "sre_blog_tags" USING btree ("_order");
  CREATE INDEX "sre_blog_tags_parent_id_idx" ON "sre_blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sre_blog_slug_idx" ON "sre_blog" USING btree ("slug");
  CREATE INDEX "sre_blog_author_idx" ON "sre_blog" USING btree ("author_id");
  CREATE INDEX "sre_blog_cover_image_idx" ON "sre_blog" USING btree ("cover_image_id");
  CREATE INDEX "sre_blog_seo_seo_og_image_idx" ON "sre_blog" USING btree ("seo_og_image_id");
  CREATE INDEX "sre_blog_updated_at_idx" ON "sre_blog" USING btree ("updated_at");
  CREATE INDEX "sre_blog_created_at_idx" ON "sre_blog" USING btree ("created_at");
  CREATE INDEX "sre_settings_nav_order_idx" ON "sre_settings_nav" USING btree ("_order");
  CREATE INDEX "sre_settings_nav_parent_id_idx" ON "sre_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "sre_settings_footer_links_order_idx" ON "sre_settings_footer_links" USING btree ("_order");
  CREATE INDEX "sre_settings_footer_links_parent_id_idx" ON "sre_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "sre_settings_logo_idx" ON "sre_settings" USING btree ("logo_id");
  CREATE INDEX "sre_settings_favicon_idx" ON "sre_settings" USING btree ("favicon_id");
  CREATE INDEX "sre_settings_seo_seo_og_image_idx" ON "sre_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "sre_settings_updated_at_idx" ON "sre_settings" USING btree ("updated_at");
  CREATE INDEX "sre_settings_created_at_idx" ON "sre_settings" USING btree ("created_at");
  CREATE INDEX "pd_media_updated_at_idx" ON "pd_media" USING btree ("updated_at");
  CREATE INDEX "pd_media_created_at_idx" ON "pd_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "pd_media_filename_idx" ON "pd_media" USING btree ("filename");
  CREATE UNIQUE INDEX "pd_pages_slug_idx" ON "pd_pages" USING btree ("slug");
  CREATE INDEX "pd_pages_hero_hero_background_image_idx" ON "pd_pages" USING btree ("hero_background_image_id");
  CREATE INDEX "pd_pages_seo_seo_og_image_idx" ON "pd_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pd_pages_updated_at_idx" ON "pd_pages" USING btree ("updated_at");
  CREATE INDEX "pd_pages_created_at_idx" ON "pd_pages" USING btree ("created_at");
  CREATE INDEX "pd_projects_images_order_idx" ON "pd_projects_images" USING btree ("_order");
  CREATE INDEX "pd_projects_images_parent_id_idx" ON "pd_projects_images" USING btree ("_parent_id");
  CREATE INDEX "pd_projects_images_image_idx" ON "pd_projects_images" USING btree ("image_id");
  CREATE INDEX "pd_projects_tags_order_idx" ON "pd_projects_tags" USING btree ("_order");
  CREATE INDEX "pd_projects_tags_parent_id_idx" ON "pd_projects_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pd_projects_slug_idx" ON "pd_projects" USING btree ("slug");
  CREATE INDEX "pd_projects_thumbnail_idx" ON "pd_projects" USING btree ("thumbnail_id");
  CREATE INDEX "pd_projects_seo_seo_og_image_idx" ON "pd_projects" USING btree ("seo_og_image_id");
  CREATE INDEX "pd_projects_updated_at_idx" ON "pd_projects" USING btree ("updated_at");
  CREATE INDEX "pd_projects_created_at_idx" ON "pd_projects" USING btree ("created_at");
  CREATE INDEX "pd_services_features_order_idx" ON "pd_services_features" USING btree ("_order");
  CREATE INDEX "pd_services_features_parent_id_idx" ON "pd_services_features" USING btree ("_parent_id");
  CREATE INDEX "pd_services_icon_idx" ON "pd_services" USING btree ("icon_id");
  CREATE INDEX "pd_services_updated_at_idx" ON "pd_services" USING btree ("updated_at");
  CREATE INDEX "pd_services_created_at_idx" ON "pd_services" USING btree ("created_at");
  CREATE INDEX "pd_team_photo_idx" ON "pd_team" USING btree ("photo_id");
  CREATE INDEX "pd_team_updated_at_idx" ON "pd_team" USING btree ("updated_at");
  CREATE INDEX "pd_team_created_at_idx" ON "pd_team" USING btree ("created_at");
  CREATE INDEX "pd_testimonials_photo_idx" ON "pd_testimonials" USING btree ("photo_id");
  CREATE INDEX "pd_testimonials_updated_at_idx" ON "pd_testimonials" USING btree ("updated_at");
  CREATE INDEX "pd_testimonials_created_at_idx" ON "pd_testimonials" USING btree ("created_at");
  CREATE INDEX "pd_blog_tags_order_idx" ON "pd_blog_tags" USING btree ("_order");
  CREATE INDEX "pd_blog_tags_parent_id_idx" ON "pd_blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pd_blog_slug_idx" ON "pd_blog" USING btree ("slug");
  CREATE INDEX "pd_blog_author_idx" ON "pd_blog" USING btree ("author_id");
  CREATE INDEX "pd_blog_cover_image_idx" ON "pd_blog" USING btree ("cover_image_id");
  CREATE INDEX "pd_blog_seo_seo_og_image_idx" ON "pd_blog" USING btree ("seo_og_image_id");
  CREATE INDEX "pd_blog_updated_at_idx" ON "pd_blog" USING btree ("updated_at");
  CREATE INDEX "pd_blog_created_at_idx" ON "pd_blog" USING btree ("created_at");
  CREATE INDEX "pd_settings_nav_order_idx" ON "pd_settings_nav" USING btree ("_order");
  CREATE INDEX "pd_settings_nav_parent_id_idx" ON "pd_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "pd_settings_footer_links_order_idx" ON "pd_settings_footer_links" USING btree ("_order");
  CREATE INDEX "pd_settings_footer_links_parent_id_idx" ON "pd_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "pd_settings_logo_idx" ON "pd_settings" USING btree ("logo_id");
  CREATE INDEX "pd_settings_favicon_idx" ON "pd_settings" USING btree ("favicon_id");
  CREATE INDEX "pd_settings_seo_seo_og_image_idx" ON "pd_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "pd_settings_updated_at_idx" ON "pd_settings" USING btree ("updated_at");
  CREATE INDEX "pd_settings_created_at_idx" ON "pd_settings" USING btree ("created_at");
  CREATE INDEX "pcd_media_updated_at_idx" ON "pcd_media" USING btree ("updated_at");
  CREATE INDEX "pcd_media_created_at_idx" ON "pcd_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "pcd_media_filename_idx" ON "pcd_media" USING btree ("filename");
  CREATE UNIQUE INDEX "pcd_pages_slug_idx" ON "pcd_pages" USING btree ("slug");
  CREATE INDEX "pcd_pages_hero_hero_background_image_idx" ON "pcd_pages" USING btree ("hero_background_image_id");
  CREATE INDEX "pcd_pages_seo_seo_og_image_idx" ON "pcd_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pcd_pages_updated_at_idx" ON "pcd_pages" USING btree ("updated_at");
  CREATE INDEX "pcd_pages_created_at_idx" ON "pcd_pages" USING btree ("created_at");
  CREATE INDEX "pcd_projects_images_order_idx" ON "pcd_projects_images" USING btree ("_order");
  CREATE INDEX "pcd_projects_images_parent_id_idx" ON "pcd_projects_images" USING btree ("_parent_id");
  CREATE INDEX "pcd_projects_images_image_idx" ON "pcd_projects_images" USING btree ("image_id");
  CREATE INDEX "pcd_projects_tags_order_idx" ON "pcd_projects_tags" USING btree ("_order");
  CREATE INDEX "pcd_projects_tags_parent_id_idx" ON "pcd_projects_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pcd_projects_slug_idx" ON "pcd_projects" USING btree ("slug");
  CREATE INDEX "pcd_projects_thumbnail_idx" ON "pcd_projects" USING btree ("thumbnail_id");
  CREATE INDEX "pcd_projects_seo_seo_og_image_idx" ON "pcd_projects" USING btree ("seo_og_image_id");
  CREATE INDEX "pcd_projects_updated_at_idx" ON "pcd_projects" USING btree ("updated_at");
  CREATE INDEX "pcd_projects_created_at_idx" ON "pcd_projects" USING btree ("created_at");
  CREATE INDEX "pcd_services_features_order_idx" ON "pcd_services_features" USING btree ("_order");
  CREATE INDEX "pcd_services_features_parent_id_idx" ON "pcd_services_features" USING btree ("_parent_id");
  CREATE INDEX "pcd_services_icon_idx" ON "pcd_services" USING btree ("icon_id");
  CREATE INDEX "pcd_services_updated_at_idx" ON "pcd_services" USING btree ("updated_at");
  CREATE INDEX "pcd_services_created_at_idx" ON "pcd_services" USING btree ("created_at");
  CREATE INDEX "pcd_team_photo_idx" ON "pcd_team" USING btree ("photo_id");
  CREATE INDEX "pcd_team_updated_at_idx" ON "pcd_team" USING btree ("updated_at");
  CREATE INDEX "pcd_team_created_at_idx" ON "pcd_team" USING btree ("created_at");
  CREATE INDEX "pcd_testimonials_photo_idx" ON "pcd_testimonials" USING btree ("photo_id");
  CREATE INDEX "pcd_testimonials_updated_at_idx" ON "pcd_testimonials" USING btree ("updated_at");
  CREATE INDEX "pcd_testimonials_created_at_idx" ON "pcd_testimonials" USING btree ("created_at");
  CREATE INDEX "pcd_blog_tags_order_idx" ON "pcd_blog_tags" USING btree ("_order");
  CREATE INDEX "pcd_blog_tags_parent_id_idx" ON "pcd_blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pcd_blog_slug_idx" ON "pcd_blog" USING btree ("slug");
  CREATE INDEX "pcd_blog_author_idx" ON "pcd_blog" USING btree ("author_id");
  CREATE INDEX "pcd_blog_cover_image_idx" ON "pcd_blog" USING btree ("cover_image_id");
  CREATE INDEX "pcd_blog_seo_seo_og_image_idx" ON "pcd_blog" USING btree ("seo_og_image_id");
  CREATE INDEX "pcd_blog_updated_at_idx" ON "pcd_blog" USING btree ("updated_at");
  CREATE INDEX "pcd_blog_created_at_idx" ON "pcd_blog" USING btree ("created_at");
  CREATE INDEX "pcd_settings_nav_order_idx" ON "pcd_settings_nav" USING btree ("_order");
  CREATE INDEX "pcd_settings_nav_parent_id_idx" ON "pcd_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "pcd_settings_footer_links_order_idx" ON "pcd_settings_footer_links" USING btree ("_order");
  CREATE INDEX "pcd_settings_footer_links_parent_id_idx" ON "pcd_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "pcd_settings_logo_idx" ON "pcd_settings" USING btree ("logo_id");
  CREATE INDEX "pcd_settings_favicon_idx" ON "pcd_settings" USING btree ("favicon_id");
  CREATE INDEX "pcd_settings_seo_seo_og_image_idx" ON "pcd_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "pcd_settings_updated_at_idx" ON "pcd_settings" USING btree ("updated_at");
  CREATE INDEX "pcd_settings_created_at_idx" ON "pcd_settings" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pia_media_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_media_id");
  CREATE INDEX "payload_locked_documents_rels_pia_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_pages_id");
  CREATE INDEX "payload_locked_documents_rels_pia_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_projects_id");
  CREATE INDEX "payload_locked_documents_rels_pia_services_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_services_id");
  CREATE INDEX "payload_locked_documents_rels_pia_team_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_team_id");
  CREATE INDEX "payload_locked_documents_rels_pia_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_pia_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_leads_id");
  CREATE INDEX "payload_locked_documents_rels_pia_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_blog_id");
  CREATE INDEX "payload_locked_documents_rels_pia_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("pia_settings_id");
  CREATE INDEX "payload_locked_documents_rels_sre_media_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_media_id");
  CREATE INDEX "payload_locked_documents_rels_sre_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_pages_id");
  CREATE INDEX "payload_locked_documents_rels_sre_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_projects_id");
  CREATE INDEX "payload_locked_documents_rels_sre_services_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_services_id");
  CREATE INDEX "payload_locked_documents_rels_sre_team_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_team_id");
  CREATE INDEX "payload_locked_documents_rels_sre_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_sre_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_blog_id");
  CREATE INDEX "payload_locked_documents_rels_sre_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("sre_settings_id");
  CREATE INDEX "payload_locked_documents_rels_pd_media_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_media_id");
  CREATE INDEX "payload_locked_documents_rels_pd_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_pages_id");
  CREATE INDEX "payload_locked_documents_rels_pd_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_projects_id");
  CREATE INDEX "payload_locked_documents_rels_pd_services_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_services_id");
  CREATE INDEX "payload_locked_documents_rels_pd_team_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_team_id");
  CREATE INDEX "payload_locked_documents_rels_pd_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_pd_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_blog_id");
  CREATE INDEX "payload_locked_documents_rels_pd_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("pd_settings_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_media_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_media_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_pages_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_projects_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_services_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_services_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_team_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_team_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_blog_id");
  CREATE INDEX "payload_locked_documents_rels_pcd_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("pcd_settings_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tenants" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "pia_media" CASCADE;
  DROP TABLE "pia_pages" CASCADE;
  DROP TABLE "pia_projects_images" CASCADE;
  DROP TABLE "pia_projects_tags" CASCADE;
  DROP TABLE "pia_projects" CASCADE;
  DROP TABLE "pia_services_features" CASCADE;
  DROP TABLE "pia_services" CASCADE;
  DROP TABLE "pia_team" CASCADE;
  DROP TABLE "pia_testimonials" CASCADE;
  DROP TABLE "pia_leads" CASCADE;
  DROP TABLE "pia_blog_tags" CASCADE;
  DROP TABLE "pia_blog" CASCADE;
  DROP TABLE "pia_settings_nav" CASCADE;
  DROP TABLE "pia_settings_footer_links" CASCADE;
  DROP TABLE "pia_settings" CASCADE;
  DROP TABLE "sre_media" CASCADE;
  DROP TABLE "sre_pages" CASCADE;
  DROP TABLE "sre_projects_images" CASCADE;
  DROP TABLE "sre_projects_tags" CASCADE;
  DROP TABLE "sre_projects" CASCADE;
  DROP TABLE "sre_services_features" CASCADE;
  DROP TABLE "sre_services" CASCADE;
  DROP TABLE "sre_team" CASCADE;
  DROP TABLE "sre_testimonials" CASCADE;
  DROP TABLE "sre_blog_tags" CASCADE;
  DROP TABLE "sre_blog" CASCADE;
  DROP TABLE "sre_settings_nav" CASCADE;
  DROP TABLE "sre_settings_footer_links" CASCADE;
  DROP TABLE "sre_settings" CASCADE;
  DROP TABLE "pd_media" CASCADE;
  DROP TABLE "pd_pages" CASCADE;
  DROP TABLE "pd_projects_images" CASCADE;
  DROP TABLE "pd_projects_tags" CASCADE;
  DROP TABLE "pd_projects" CASCADE;
  DROP TABLE "pd_services_features" CASCADE;
  DROP TABLE "pd_services" CASCADE;
  DROP TABLE "pd_team" CASCADE;
  DROP TABLE "pd_testimonials" CASCADE;
  DROP TABLE "pd_blog_tags" CASCADE;
  DROP TABLE "pd_blog" CASCADE;
  DROP TABLE "pd_settings_nav" CASCADE;
  DROP TABLE "pd_settings_footer_links" CASCADE;
  DROP TABLE "pd_settings" CASCADE;
  DROP TABLE "pcd_media" CASCADE;
  DROP TABLE "pcd_pages" CASCADE;
  DROP TABLE "pcd_projects_images" CASCADE;
  DROP TABLE "pcd_projects_tags" CASCADE;
  DROP TABLE "pcd_projects" CASCADE;
  DROP TABLE "pcd_services_features" CASCADE;
  DROP TABLE "pcd_services" CASCADE;
  DROP TABLE "pcd_team" CASCADE;
  DROP TABLE "pcd_testimonials" CASCADE;
  DROP TABLE "pcd_blog_tags" CASCADE;
  DROP TABLE "pcd_blog" CASCADE;
  DROP TABLE "pcd_settings_nav" CASCADE;
  DROP TABLE "pcd_settings_footer_links" CASCADE;
  DROP TABLE "pcd_settings" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_pia_leads_source";
  DROP TYPE "public"."enum_pia_leads_status";
  DROP TYPE "public"."enum_sre_testimonials_rating";
  DROP TYPE "public"."enum_pd_testimonials_rating";
  DROP TYPE "public"."enum_pcd_testimonials_rating";`)
}
