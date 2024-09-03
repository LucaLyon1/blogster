-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentJobTitle" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "jobHistory" JSONB,
ADD COLUMN     "phoneNumber" TEXT;
