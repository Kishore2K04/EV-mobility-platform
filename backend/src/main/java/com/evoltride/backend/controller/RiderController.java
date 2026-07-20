package com.evoltride.backend.controller;

import com.evoltride.backend.entity.Rider;
import com.evoltride.backend.dto.RiderRegistrationRequest;
import com.evoltride.backend.dto.AddMoneyRequest;
import com.evoltride.backend.entity.Transaction;
import com.evoltride.backend.service.RiderService;
import com.evoltride.backend.service.WalletService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/riders")
public class RiderController {

    private final RiderService riderService;
    private final WalletService walletService;

    public RiderController(RiderService riderService, WalletService walletService) {
        this.riderService = riderService;
        this.walletService = walletService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RiderRegistrationRequest request) {

        return riderService.register(request);

    }

    @GetMapping("/profile/{email}")
    public Rider getProfile(@PathVariable String email) {

        return riderService.getProfile(email);

    }

    @GetMapping("/wallet/{email}")
    public Double getWalletBalance(@PathVariable String email) {
        return walletService.getRiderWalletBalance(email);
    }

    @PostMapping("/wallet/addmoney")
    public String addMoney(@RequestBody AddMoneyRequest request) {
        return walletService.addMoney(request.getEmail(), request.getAmount());
    }

    @GetMapping("/transactions/{email}")
    public List<Transaction> getTransactions(@PathVariable String email) {
        return walletService.getTransactions(email);
    }

}