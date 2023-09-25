-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "reportDefinitionId" TEXT;

-- CreateTable
CREATE TABLE "Indicator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'Instagram',
    "icon" TEXT NOT NULL DEFAULT 'AreaChart',

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ReportDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndicatorReportDefinition" (
    "id" TEXT NOT NULL,
    "indicatorId" TEXT NOT NULL,
    "reportDefinitionId" TEXT NOT NULL,

    CONSTRAINT "IndicatorReportDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Informe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Informe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataIndicator" (
    "id" TEXT NOT NULL,
    "indicatorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "previousValue" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "informeId" TEXT NOT NULL,

    CONSTRAINT "DataIndicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IndicatorToReportDefinition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IndicatorToReportDefinition_AB_unique" ON "_IndicatorToReportDefinition"("A", "B");

-- CreateIndex
CREATE INDEX "_IndicatorToReportDefinition_B_index" ON "_IndicatorToReportDefinition"("B");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_reportDefinitionId_fkey" FOREIGN KEY ("reportDefinitionId") REFERENCES "ReportDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorReportDefinition" ADD CONSTRAINT "IndicatorReportDefinition_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorReportDefinition" ADD CONSTRAINT "IndicatorReportDefinition_reportDefinitionId_fkey" FOREIGN KEY ("reportDefinitionId") REFERENCES "ReportDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Informe" ADD CONSTRAINT "Informe_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataIndicator" ADD CONSTRAINT "DataIndicator_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataIndicator" ADD CONSTRAINT "DataIndicator_informeId_fkey" FOREIGN KEY ("informeId") REFERENCES "Informe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IndicatorToReportDefinition" ADD CONSTRAINT "_IndicatorToReportDefinition_A_fkey" FOREIGN KEY ("A") REFERENCES "Indicator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IndicatorToReportDefinition" ADD CONSTRAINT "_IndicatorToReportDefinition_B_fkey" FOREIGN KEY ("B") REFERENCES "ReportDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
