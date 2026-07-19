package com.finance.helloapp.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.helloapp.entity.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
 List<Budget> findByUserId(Long id);
}