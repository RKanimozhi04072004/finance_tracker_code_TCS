package com.finance.helloapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.helloapp.dto.BudgetAnalyticsDTO;
import com.finance.helloapp.entity.Budget;
import com.finance.helloapp.entity.Transaction;
import com.finance.helloapp.repository.BudgetRepository;
import com.finance.helloapp.repository.TransactionRepository;

@Service
public class BudgetAnalyticsService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<BudgetAnalyticsDTO> getBudgetAnalytics(Long userId) {

        List<BudgetAnalyticsDTO> analytics = new ArrayList<>();

        List<Budget> budgets = budgetRepository.findByUserId(userId);

        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        for (Budget budget : budgets) {

            double spent = 0;

            for (Transaction transaction : transactions) {

                if (transaction.getType().equalsIgnoreCase("Expense")
                        && transaction.getCategory().equalsIgnoreCase(budget.getCategory())) {

                    spent += transaction.getAmount();
                }
            }

            double remaining = budget.getMonthlyLimit() - spent;

            String status;

            if (spent > budget.getMonthlyLimit()) {
                status = "Over Budget";
            } else if (spent >= budget.getMonthlyLimit() * 0.8) {
                status = "Near Limit";
            } else {
                status = "Within Budget";
            }

            analytics.add(
                    new BudgetAnalyticsDTO(
                            budget.getCategory(),
                            budget.getMonthlyLimit(),
                            spent,
                            remaining,
                            status));
        }

        return analytics;
    }
}