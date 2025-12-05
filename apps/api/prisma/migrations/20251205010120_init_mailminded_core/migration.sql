-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('DRAFT', 'SENT');

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "subject" TEXT,
    "fromEmail" TEXT,
    "company" TEXT,
    "role" TEXT,
    "body" TEXT NOT NULL,
    "isRejection" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" SERIAL NOT NULL,
    "emailId" INTEGER NOT NULL,
    "draftBody" TEXT NOT NULL,
    "status" "FollowUpStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
