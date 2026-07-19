package com.finance.helloapp.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.helloapp.entity.Transaction;
import com.finance.helloapp.repository.TransactionRepository;

@Service
public class ExportService {

    @Autowired
    private TransactionRepository transactionRepository;

    public ByteArrayInputStream exportMonthlyCSV(Long userId, String month) {

        YearMonth yearMonth = YearMonth.parse(month);

        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<Transaction> transactions =
                transactionRepository.findByUserIdAndTransactionDateBetween(
                        userId,
                        startDate,
                        endDate);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        writer.println("Title,Category,Type,Amount,Date");

        for (Transaction transaction : transactions) {

            writer.println(
                    transaction.getTitle() + "," +
                    transaction.getCategory() + "," +
                    transaction.getType() + "," +
                    transaction.getAmount() + "," +
                    transaction.getTransactionDate()
            );
        }

        writer.flush();

        return new ByteArrayInputStream(out.toByteArray());
    }
}