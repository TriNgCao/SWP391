package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;
import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.repository.IBookedScheduleRepository;
import com.swp391.hairsalon.repository.IStylistRepository;
import com.swp391.hairsalon.service.definitions.IBookedScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

import java.sql.Date;
import java.util.*;

@Service
public class BookedScheduleService implements IBookedScheduleService {
    @Autowired
    private IBookedScheduleRepository iBookedScheduleRepository;

    @Autowired
    private IStylistRepository iStylistRepository;

    @Override
    public List<ScheduleTableDto> getScheduleByStylistIdAndDate(int stylistId, Date date) {
        return iBookedScheduleRepository.getScheduleByStylistAndDate(date, stylistId);
    }

    @Override
    public List<ScheduleTableDto> getAllBookedSchedule(Date date) {
        ScheduleTableDto scheduleTableDto = new ScheduleTableDto();
        scheduleTableDto.setScheduleId(0);
        scheduleTableDto.setStartTime(8);
        scheduleTableDto.setEndTime(22);
        scheduleTableDto.setDuration(1);
        List<Integer> lists = getAllBookedTime(date);
        List<ScheduleTableDto> listDto = new ArrayList<>();
        for (Integer i : lists) {
            scheduleTableDto.setBookedTime(i);
            listDto.add(scheduleTableDto);
        }
        return listDto;
    }

    public List<Integer> getAllBookedTime(Date date) {
        int[] arr = {8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22};
        List<ScheduleTableDto> lists = iBookedScheduleRepository.getScheduleByDate(date);

        // Bước 1: Nhóm các ScheduleTableDto theo scheduleId
        Map<Integer, List<ScheduleTableDto>> groupedSchedules = new HashMap<>();
        for (ScheduleTableDto schedule : lists) {
            groupedSchedules.computeIfAbsent(schedule.getScheduleId(), k -> new ArrayList<>()).add(schedule);
        }

        // Bước 2: Lấy thời gian bận cho từng nhóm scheduleId
        for (List<ScheduleTableDto> schedules : groupedSchedules.values()) {
            Set<Integer> mergedTimes = new HashSet<>();

            for (ScheduleTableDto schedule : schedules) {
                int[] times = generateTimeArray(schedule.getBookedTime(), schedule.getDuration());
                for (int time : times) {
                    mergedTimes.add(time);
                }
            }

            // Chuyển Set thành mảng để so sánh với arr
            int[] stylistScheduleNotAvai = mergedTimes.stream().mapToInt(Integer::intValue).toArray();
            arr = findCommonElements(arr, stylistScheduleNotAvai); // Lấy lịch bận chung
        }

        return convertArrayToList(arr);
    }

    public static int[] findCommonElements(int[] array1, int[] array2) {
        Set<Integer> set1 = new HashSet<>();
        Set<Integer> commonElements = new HashSet<>();

        // Thêm tất cả các phần tử của array1 vào set1
        for (int num : array1) {
            set1.add(num);
        }

        // Kiểm tra các phần tử của array2 trong set1, nếu có thì thêm vào commonElements
        for (int num : array2) {
            if (set1.contains(num)) {
                commonElements.add(num);
            }
        }

        // Chuyển set thành mảng
        int[] result = new int[commonElements.size()];
        int index = 0;
        for (int num : commonElements) {
            result[index++] = num;
        }

        return result;
    }


    public static List<Integer> convertArrayToList(int[] array) {
        List<Integer> list = new ArrayList<>();
        for (int num : array) {
            list.add(num);  // Thêm từng phần tử vào List
        }
        return list;
    }

    public static int[] generateTimeArray(int bookedTime, int duration) {
        int[] timeArray = new int[duration + 1];

        for (int i = 0; i < duration; i++) {
            timeArray[i] = bookedTime + i;

        }

        return timeArray;
    }

     public Integer chooseRandomAvailableStylist(int startBookedTime, int duration, int salonId, Date date) {
        // Lấy danh sách tất cả stylists theo salonId
    List<Stylist> allStylists = iStylistRepository.getStylistsBySalonId(salonId);

    // Lọc stylist trống hoặc có thời gian trống trong ngày
    List<Stylist> availableStylists = allStylists.stream()
        .filter(stylist -> stylist.getSchedules().stream()
            .filter(schedule -> schedule.getDate().equals(date))
            .allMatch(schedule -> isStylistAvailableForDuration(schedule, startBookedTime, duration))
        )
        .collect(Collectors.toList());

    // Nếu không có stylist nào rảnh vào khoảng thời gian đó, trả về null hoặc xử lý khác
    if (availableStylists.isEmpty()) {
        return null;
    }
    // Chọn stylist ngẫu nhiên từ danh sách stylist khả dụng
    Random random = new Random();
    int randomIndex = random.nextInt(availableStylists.size());
    return availableStylists.get(randomIndex).getStylistId();
    }


    private boolean isStylistAvailableForDuration(Schedule schedule, int startBookedTime, int duration) {
    // Tính toán thời gian kết thúc dự kiến
    int endBookedTime = startBookedTime + duration;

    // Duyệt qua tất cả các BookedSchedule của lịch trình để kiểm tra xung đột
    for (BookedSchedule bookedSchedule : schedule.getBookedSchedules()) {
        int bookedStartTime = bookedSchedule.getBookedTime();
        int bookedEndTime = bookedStartTime + bookedSchedule.getDuration();

        // Kiểm tra xung đột thời gian: stylist không khả dụng nếu khoảng thời gian yêu cầu trùng lặp
        if ((startBookedTime >= bookedStartTime && startBookedTime < bookedEndTime) ||
            (endBookedTime > bookedStartTime && endBookedTime <= bookedEndTime) ||
            (startBookedTime <= bookedStartTime && endBookedTime >= bookedEndTime)) {
            return false; // Không khả dụng do trùng lặp thời gian
        }
    }

    // Nếu không có xung đột thời gian nào, stylist khả dụng
    return true;
}

    
}


