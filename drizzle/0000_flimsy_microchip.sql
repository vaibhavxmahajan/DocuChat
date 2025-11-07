CREATE TABLE "auth_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"email_verified" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
