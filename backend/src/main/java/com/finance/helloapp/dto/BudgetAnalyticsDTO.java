package com.finance.helloapp.dto;

public class BudgetAnalyticsDTO {

    private String category;
    private Double budget;
    private Double spent;
    private Double remaining;
    private String status;

    public BudgetAnalyticsDTO() {
    }

    public BudgetAnalyticsDTO(String category, Double budget, Double spent,
                              Double remaining, String status) {
        this.category = category;
        this.budget = budget;
        this.spent = spent;
        this.remaining = remaining;
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Double getSpent() {
        return spent;
    }

    public void setSpent(Double spent) {
        this.spent = spent;
    }

    public Double getRemaining() {
        return remaining;
    }

    public void setRemaining(Double remaining) {
        this.remaining = remaining;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}