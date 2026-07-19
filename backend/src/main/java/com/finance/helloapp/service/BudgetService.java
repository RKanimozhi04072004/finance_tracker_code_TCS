package com.finance.helloapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.helloapp.entity.Budget;
import com.finance.helloapp.repository.BudgetRepository;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    
    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    
    public List<Budget> getBudgetsByUser(Long id) {
        return budgetRepository.findByUserId(id);
    }

   
    public Budget updateBudget(Long id, Budget budget) {

        Budget oldBudget = budgetRepository.findById(id).orElse(null);

        if (oldBudget != null) {

            oldBudget.setCategory(budget.getCategory());
            oldBudget.setMonthlyLimit(budget.getMonthlyLimit());
            oldBudget.setMonth(budget.getMonth());

            return budgetRepository.save(oldBudget);
        }

        return null;
    }

    
    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}