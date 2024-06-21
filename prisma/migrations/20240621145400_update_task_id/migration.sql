/*
  Warnings:

  - A unique constraint covering the columns `[taskid]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "taskid" DROP DEFAULT,
ALTER COLUMN "taskid" SET DATA TYPE TEXT;
DROP SEQUENCE "Task_taskid_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskid_key" ON "Task"("taskid");
