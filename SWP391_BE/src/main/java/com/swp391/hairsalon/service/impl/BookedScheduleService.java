package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;
import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.repository.IBookedScheduleRepository;
import com.swp391.hairsalon.repository.IScheduleRepository;
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
    private IScheduleRepository iScheduleRepository;

    @Autowired
    private IStylistRepository iStylistRepository;

    @Override
    public List<ScheduleTableDto> getScheduleByStylistIdAndDate(int stylistId, Date date) {
        if (iScheduleRepository.getScheduleId(stylistId, date) == null) {
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

        List<ScheduleTableDto> listDto = new ArrayList<>();
        List<Integer> lists = getAllBookedTime(date);
        if (lists == null) {
            listDto.add(new ScheduleTableDto(8, 22, 0, 0 ,0));
            return listDto;
        }

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

    @Override
    public void updateStatusBookedSchedule(int id) {
        BookedSchedule b = iBookedScheduleRepository.getById(id);
        b.setBooked(false);
        iBookedScheduleRepository.save(b);
    }

    @Override
    public int getBookedId(int bookedTime, int scheduleId) {
        return iBookedScheduleRepository.getBookedId(bookedTime, scheduleId);
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
        for (int num : array1) {
            set1.add(num);
        }
        for (int num : array2) {
            if (set1.contains(num)) {
                commonElements.add(num);
            }
        }
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
            list.add(num);  
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
        List<Stylist> allStylists = iStylistRepository.getStylistsBySalonId(salonId);

        List<Stylist> availableStylists = allStylists.stream()
                .filter(stylist -> stylist.getSchedules().stream()
                        .filter(schedule -> schedule.getDate().equals(date))
                        .allMatch(schedule -> isStylistAvailableForDuration(schedule, startBookedTime, duration))
                )
                .collect(Collectors.toList());
        if (availableStylists.isEmpty()) {
            return null;
        }
        Random random = new Random();
        int randomIndex = random.nextInt(availableStylists.size());
        return availableStylists.get(randomIndex).getStylistId();
    }


    private boolean isStylistAvailableForDuration(Schedule schedule, int startBookedTime, int duration) {
        int endBookedTime = startBookedTime + duration;

        for (BookedSchedule bookedSchedule : schedule.getBookedSchedules()) {
            int bookedStartTime = bookedSchedule.getBookedTime();
            int bookedEndTime = bookedStartTime + bookedSchedule.getDuration();

            if ((startBookedTime >= bookedStartTime && startBookedTime < bookedEndTime) ||
                    (endBookedTime > bookedStartTime && endBookedTime <= bookedEndTime) ||
                    (startBookedTime <= bookedStartTime && endBookedTime >= bookedEndTime)) {
                return false; 
            }
        }

        return true;
    }

    @Override
    public boolean existsByStylistAndStartTime(int stylistId, int startTime) {
        return iBookedScheduleRepository.existsByStylistAndStartTime(stylistId, startTime);
    }


}


