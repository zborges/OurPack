ALTER TABLE "items" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "category" SET DEFAULT 'shelter'::text;--> statement-breakpoint
DROP TYPE "public"."item_category";--> statement-breakpoint
CREATE TYPE "public"."item_category" AS ENUM('pack_system', 'shelter', 'sleep_system', 'clothing', 'filtration_and_cookware', 'essentials', 'electronics', 'miscellaneous');--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "category" SET DEFAULT 'shelter'::"public"."item_category";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "category" SET DATA TYPE "public"."item_category" USING "category"::"public"."item_category";