using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using OfficeOpenXml;
using System.Data.SqlClient;

namespace MyWeb
{
    public class ExcelGenerator
    {

        public byte[] GenerateExcelFile(string nameReport, string sqlQuery, AppDBContent context, bool needId = false, int id = -1)
        {
            using (var connection = context.Database.GetDbConnection())
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = sqlQuery;
                    if (needId)
                    {
                        var parameter = new MySqlParameter("@curId", id);
                        command.Parameters.Add(parameter);
                    }
                    using (var reader = command.ExecuteReader())
                    {
                        using (var package = new ExcelPackage())
                        {
                            var worksheet = package.Workbook.Worksheets.Add(nameReport);
                            var rowIndex = 1;

                            var currentDate = DateTime.Now.ToString("dd.MM.yyyy");
                            var dateCell = worksheet.Cells[rowIndex, reader.FieldCount + 1];
                            dateCell.Value = currentDate;
                            dateCell.Style.Font.Bold = true;

                            for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
                            {
                                worksheet.Cells[rowIndex, columnIndex + 1].Value = reader.GetName(columnIndex);
                                worksheet.Cells[rowIndex, columnIndex + 1].Style.Font.Bold = true;
                            }

                            while (reader.Read())
                            {
                                rowIndex++;
                                for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
                                {
                                    var value = reader.GetValue(columnIndex);
                                    worksheet.Cells[rowIndex, columnIndex + 1].Value = value;
                                }
                            }

                            worksheet.Cells.AutoFitColumns();

                            return package.GetAsByteArray();
                        }
                    }
                }
            }
        }

    }
}
