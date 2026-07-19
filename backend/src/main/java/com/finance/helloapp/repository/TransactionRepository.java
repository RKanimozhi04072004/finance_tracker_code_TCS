
package com.finance.helloapp.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.finance.helloapp.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

      List<Transaction> findByUserId(Long id);
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type='Income'")
    Double getTotalIncome();

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type='Expense'")
    Double getTotalExpense();

    List<Transaction> findByUserIdAndTransactionDateBetween(
        Long userId,
        LocalDate startDate,
        LocalDate endDate
);

}