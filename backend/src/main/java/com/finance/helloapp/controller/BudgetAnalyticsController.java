package com.finance.helloapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.helloapp.dto.BudgetAnalyticsDTO;
import com.finance.helloapp.service.BudgetAnalyticsService;

@RestController
@RequestMapping("/api/budget-analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetAnalyticsController {

    @Autowired
    private BudgetAnalyticsService budgetAnalyticsService;

    @GetMapping("/{userId}")
    public List<BudgetAnalyticsDTO> getBudgetAnalytics(
            @PathVariable Long userId) {

        return budgetAnalyticsService.getBudgetAnalytics(userId);
    }
}