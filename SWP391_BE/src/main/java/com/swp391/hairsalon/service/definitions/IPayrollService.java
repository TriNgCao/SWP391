package com.swp391.hairsalon.service.definitions;

import java.util.*;

import com.swp391.hairsalon.pojo.Payroll;

public interface IPayrollService {
    public void savePayroll(Payroll payroll);

    public List<Payroll> getPayrollBySalon(int salonId);

    public Payroll findPayrollById (int payrollId);

    List<Payroll> getPayrollByStylist(int stylistId);

    public Payroll updatePayroll(Payroll payRoll);
}
