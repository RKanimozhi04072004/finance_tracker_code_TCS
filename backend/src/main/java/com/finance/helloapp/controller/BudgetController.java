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

import com.finance.helloapp.entity.Budget;
import com.finance.helloapp.service.BudgetService;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

   
    @PostMapping
    public Budget saveBudget(@RequestBody Budget budget) {
        return budgetService.saveBudget(budget);
    }

    
    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    
    @GetMapping("/user/{id}")
    public List<Budget> getBudgetsByUser(@PathVariable Long id) {
        return budgetService.getBudgetsByUser(id);
    }


    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id,
                               @RequestBody Budget budget) {

        return budgetService.updateBudget(id, budget);
    }

    
    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {

        budgetService.deleteBudget(id);

        return "Budget Deleted Successfully";
    }
}