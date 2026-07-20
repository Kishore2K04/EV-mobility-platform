package com.evoltride.backend.repository;

import com.evoltride.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserEmailOrderByTimestampDesc(String userEmail);

}