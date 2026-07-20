package com.evoltride.backend.controller;

import com.evoltride.backend.dto.DriverRegistrationRequest;
import com.evoltride.backend.entity.Transaction;
import com.evoltride.backend.service.DriverService;
import com.evoltride.backend.service.WalletService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;
    private final WalletService walletService;

    public DriverController(DriverService driverService, WalletService walletService) {
        this.driverService = driverService;
        this.walletService = walletService;
    }

    @PostMapping("/register")
    public String register(@RequestBody DriverRegistrationRequest request) {

        return driverService.register(request);

    }

    @GetMapping("/wallet/{email}")
    public Double getWalletBalance(@PathVariable String email) {
        return walletService.getDriverWalletBalance(email);
    }

    @GetMapping("/transactions/{email}")
    public List<Transaction> getTransactions(@PathVariable String email) {
        return walletService.getTransactions(email);
    }

}