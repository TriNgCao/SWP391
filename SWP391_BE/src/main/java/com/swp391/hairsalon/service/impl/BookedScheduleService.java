package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.repository.IBookedScheduleRepository;
import com.swp391.hairsalon.repository.IScheduleRepository;
import com.swp391.hairsalon.service.definitions.IBookedScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.*;

@Service
public class BookedScheduleService implements IBookedScheduleService {
    @Autowired
    private IBookedScheduleRepository iBookedScheduleRepository;

    @Autowired
    private IScheduleRepository iScheduleRepository;

    @Override
    public List<ScheduleTableDto> getScheduleByStylistIdAndDate(int stylistId, Date date) {
        if(iScheduleRepository.getScheduleId(stylistId, date) == null){
            System.out.println("No Schedule Found");
            List<ScheduleTableDto> lists = new ArrayList<>();
            ScheduleTableDto scheduleTableDto = new ScheduleTableDto();
            scheduleTableDto.setEndTime(7);
            lists.add(scheduleTableDto);
            return lists;
        }
        return iBookedScheduleRepository.getScheduleByStylistAndDate(date, stylistId);
    }

    @Override
    public List<ScheduleTableDto> getAllBookedSchedule(Date date) {


        List<Integer> lists = getAllBookedTime(date);
        if (lists.isEmpty()) {
            return null;
        }
        List<ScheduleTableDto> listDto = new ArrayList<>();
        for (Integer i : lists) {
            ScheduleTableDto scheduleTableDto = new ScheduleTableDto();
            scheduleTableDto.setScheduleId(0);
            scheduleTableDto.setStartTime(8);
            scheduleTableDto.setEndTime(22);
            scheduleTableDto.setDuration(1);
            scheduleTableDto.setBookedTime(i);
            listDto.add(scheduleTableDto);
        }
        return listDto;
    }

    @Override
    public void addBookedSchedule(BookedSchedule bookedSchedule) {
        iBookedScheduleRepository.save(bookedSchedule);
    }

    public List<Integer> getAllBookedTime(Date date) {
        int[] arr = {8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22};
        List<ScheduleTableDto> lists = iBookedScheduleRepository.getScheduleByDate(date);
        int count = iBookedScheduleRepository.countByDate(date);

        // Bước 1: Nhóm các ScheduleTableDto theo scheduleId
        Map<Integer, List<ScheduleTableDto>> groupedSchedules = new HashMap<>();
        for (ScheduleTableDto schedule : lists) {
            groupedSchedules.computeIfAbsent(schedule.getScheduleId(), k -> new ArrayList<>()).add(schedule);
        }
        if (count > groupedSchedules.size()) {
            return null;
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

}
