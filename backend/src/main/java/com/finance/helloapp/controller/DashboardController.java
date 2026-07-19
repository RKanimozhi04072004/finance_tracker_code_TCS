package com.finance.helloapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.helloapp.service.TransactionService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{userId}")
    public Map<String, Double> getDashboard(@PathVariable Long userId) {

        Map<String, Double> dashboard = new HashMap<>();

        dashboard.put("income",
                transactionService.getTotalIncome(userId));

        dashboard.put("expense",
                transactionService.getTotalExpense(userId));

        dashboard.put("balance",
                transactionService.getBalance(userId));

        return dashboard;
    }
}