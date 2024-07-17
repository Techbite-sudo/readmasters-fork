-- CreateTable
CREATE TABLE "client_has_users" (
    "id" BIGINT NOT NULL,
    "client_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "client_has_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client_has_users" ADD CONSTRAINT "client_has_users_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_has_users" ADD CONSTRAINT "client_has_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
