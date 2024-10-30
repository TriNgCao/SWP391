package com.swp391.hairsalon.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Revenue {
    private BigDecimal totalRevenue;
    private BigDecimal totalProfit;
    private List<DailyRevenue> dailyRevenues;
    @Data
    @AllArgsConstructor
    public static class DailyRevenue {
        private LocalDate date;
        private BigDecimal dailyTotal;
    }
    public Revenue(BigDecimal totalRevenue, BigDecimal totalProfit) {
        this.totalRevenue = totalRevenue;
        this.totalProfit = totalProfit;
    }

    
}
