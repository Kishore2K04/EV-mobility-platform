package com.evoltride.backend.service;

import com.evoltride.backend.entity.Driver;
import com.evoltride.backend.entity.Rider;
import com.evoltride.backend.entity.Transaction;
import com.evoltride.backend.repository.DriverRepository;
import com.evoltride.backend.repository.RiderRepository;
import com.evoltride.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WalletService {

    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final TransactionRepository transactionRepository;

    public WalletService(RiderRepository riderRepository,
                          DriverRepository driverRepository,
                          TransactionRepository transactionRepository) {
        this.riderRepository = riderRepository;
        this.driverRepository = driverRepository;
        this.transactionRepository = transactionRepository;
    }

    public String addMoney(String email, Double amount) {

        Rider rider = riderRepository.findByEmail(email).orElse(null);

        if (rider == null) {
            return "Rider not found.";
        }

        double currentBalance = (rider.getWalletBalance() != null) ? rider.getWalletBalance() : 0.0;
        rider.setWalletBalance(currentBalance + amount);

        riderRepository.save(rider);

        saveTransaction(email, "CREDIT", amount, "Wallet top-up", null);

        return "Money added successfully. New balance: " + rider.getWalletBalance();
    }

    public Double getRiderWalletBalance(String email) {

        Rider rider = riderRepository.findByEmail(email).orElse(null);

        if (rider == null) {
            return null;
        }

        return (rider.getWalletBalance() != null) ? rider.getWalletBalance() : 0.0;
    }

    public Double getDriverWalletBalance(String email) {

        Driver driver = driverRepository.findByEmail(email).orElse(null);

        if (driver == null) {
            return null;
        }

        return (driver.getWalletBalance() != null) ? driver.getWalletBalance() : 0.0;
    }

    public List<Transaction> getTransactions(String email) {
        return transactionRepository.findByUserEmailOrderByTimestampDesc(email);
    }

    public void processRidePayment(String riderEmail, String driverEmail, Long rideId, Double fareAmount) {

        Rider rider = riderRepository.findByEmail(riderEmail).orElse(null);

        if (rider != null) {
            double riderBalance = (rider.getWalletBalance() != null) ? rider.getWalletBalance() : 0.0;
            rider.setWalletBalance(riderBalance - fareAmount);
            riderRepository.save(rider);
            saveTransaction(riderEmail, "DEBIT", fareAmount, "Ride payment", rideId);
        }

        Driver driver = driverRepository.findByEmail(driverEmail).orElse(null);

        if (driver != null) {
            double driverBalance = (driver.getWalletBalance() != null) ? driver.getWalletBalance() : 0.0;
            driver.setWalletBalance(driverBalance + fareAmount);
            driverRepository.save(driver);
            saveTransaction(driverEmail, "CREDIT", fareAmount, "Ride earning", rideId);
        }

    }

    private void saveTransaction(String email, String type, Double amount, String description, Long rideId) {

        Transaction transaction = new Transaction();

        transaction.setUserEmail(email);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setRideId(rideId);
        transaction.setTimestamp(LocalDateTime.now());

        transactionRepository.save(transaction);
    }
}