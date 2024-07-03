-- CreateTable
CREATE TABLE "Template" (
    "template_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "design_file" TEXT,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("template_id")
);

-- CreateTable
CREATE TABLE "Design" (
    "design_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "design_file" TEXT,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("design_id")
);

-- CreateTable
CREATE TABLE "Customization" (
    "customization_id" SERIAL NOT NULL,
    "design_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "color_scheme" TEXT,
    "font_style" TEXT,
    "layout" TEXT,
    "preview" TEXT,

    CONSTRAINT "Customization_pkey" PRIMARY KEY ("customization_id")
);

-- CreateTable
CREATE TABLE "Content" (
    "content_id" SERIAL NOT NULL,
    "customization_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "Deployment" (
    "deployment_id" SERIAL NOT NULL,
    "customization_id" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deployment_date" TIMESTAMP(3) NOT NULL,
    "site_url" TEXT,
    "ssh_login" TEXT,
    "ssh_key" TEXT,

    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("deployment_id")
);

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customization" ADD CONSTRAINT "Customization_design_id_fkey" FOREIGN KEY ("design_id") REFERENCES "Design"("design_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customization" ADD CONSTRAINT "Customization_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_customization_id_fkey" FOREIGN KEY ("customization_id") REFERENCES "Customization"("customization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_customization_id_fkey" FOREIGN KEY ("customization_id") REFERENCES "Customization"("customization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
