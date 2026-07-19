package com.finance.helloapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.helloapp.entity.Transaction;
import com.finance.helloapp.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

  @GetMapping("/user/{id}")
public List<Transaction> getTransactionsByUser(@PathVariable Long id) {
    return transactionService.getTransactionsByUser(id);
}
   
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    
    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id,
                                         @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }
    
   
    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        return transactionService.deleteTransaction(id);
    }
    
}