package com.finance.helloapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.helloapp.entity.Transaction;
import com.finance.helloapp.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
public List<Transaction> getTransactionsByUser(Long id) {
    return transactionRepository.findByUserId(id);
}
   
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

  
    public Transaction updateTransaction(Long id, Transaction transaction) {

        Transaction oldTransaction = transactionRepository.findById(id).orElse(null);

        if (oldTransaction != null) {

            oldTransaction.setTitle(transaction.getTitle());
            oldTransaction.setAmount(transaction.getAmount());
            oldTransaction.setType(transaction.getType());
            oldTransaction.setCategory(transaction.getCategory());
            oldTransaction.setTransactionDate(transaction.getTransactionDate());

            return transactionRepository.save(oldTransaction);
        }

        return null;
    }
    public double getTotalIncome(Long userId) {

    double income = 0;

    List<Transaction> transactions = transactionRepository.findByUserId(userId);

    for (Transaction transaction : transactions) {

        if (transaction.getType().equalsIgnoreCase("Income")) {

            income += transaction.getAmount();

        }

    }

    return income;
}
public double getTotalExpense(Long userId) {

    double expense = 0;

    List<Transaction> transactions = transactionRepository.findByUserId(userId);

    for (Transaction transaction : transactions) {

        if (transaction.getType().equalsIgnoreCase("Expense")) {

            expense += transaction.getAmount();

        }

    }

    return expense;
}
public double getBalance(Long userId) {

    double income = getTotalIncome(userId);

    double expense = getTotalExpense(userId);

    return income - expense;
}


    public String deleteTransaction(Long id) {

        transactionRepository.deleteById(id);

        return "Transaction Deleted Successfully";
    }

}