package com.eunbi.PianoClass.controller;


import com.eunbi.PianoClass.common.CommonAssert;
import com.eunbi.PianoClass.common.util.UserUtil;
import com.eunbi.PianoClass.constant.Constant;
import com.eunbi.PianoClass.domain.Reservation;
import com.eunbi.PianoClass.exception.InvalidRequestException;
import com.eunbi.PianoClass.exception.UnAuthorizationException;
import com.eunbi.PianoClass.exception.ResourceNotFoundException;
import com.eunbi.PianoClass.repository.ReservationRepository;
import com.eunbi.PianoClass.repository.StudentRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = Constant.BASE_URL)
public class ReservationController {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    StudentRepository studentRepository;
    @GetMapping("/students/{studentId}/reservations")
    ResponseEntity<?> findAllByStudentId(@PathVariable String studentId) {
        return ResponseEntity.ok(reservationRepository.findAllByStudentId(studentId));
    }

    @PostMapping("/students/{studentId}/reservations")
    ResponseEntity<?> makeReservation(@PathVariable String studentId, ReservationCreateReq req) {
        log.info("[{}] [{}] [{}] - req: {}","reservation",UserUtil.getUser().getUsername(), "create", req.toString());
        //중복체크
        LocalDateTime start = req.getReservationTime();
        LocalDateTime end = start.plusMinutes(59);
        Optional.ofNullable(reservationRepository.findAllByReservationTimeBetween(start,end))
                .ifPresent(reservations->{
                    if( reservations.size() > 0) {
                        throw new InvalidRequestException("reservation is already exist" + start);
                    }
                });
        return studentRepository.findById(studentId).map( student -> {
                    Reservation newReservation = new Reservation();
                    newReservation.setDuration(Duration.ofMinutes(30 * req.getHalfHours()));
                    newReservation.setReservationTime(req.getReservationTime());
                    newReservation.setStudent(student);
                    return ResponseEntity.ok(reservationRepository.save(newReservation));
            }
        ).orElseThrow(()->new ResourceNotFoundException("student Id is not found: " + studentId));
    }

    @PutMapping("/students/{studentId}/reservations/{id}")
    ResponseEntity<?> updateReservation(@PathVariable String studentId, @PathVariable String id,  ReservationUpdateReq req ) {
        return studentRepository.findById(studentId).map( student -> {
                    return ResponseEntity.ok(reservationRepository.findById(id).map(reservation->{
                        reservation.setReservationTime(CommonAssert.nullSafeValue(req.getReservationTime(), ()->reservation.getReservationTime()));
                        reservation.setDuration(CommonAssert.nullSafeValue(Duration.ofMinutes(30 * req.getHalfHours()), ()->reservation.getDuration()));
                        return reservationRepository.save(reservation);
                    }).orElseThrow(()-> new ResourceNotFoundException("reservation id is not found: " + id)));
                }
        ).orElseThrow(()->new ResourceNotFoundException("student Id is not found: " + studentId));
    }

    @DeleteMapping("/students/{studentId}/reservations/{id}")
    ResponseEntity<?> deleteReservation(@PathVariable String studentId, @PathVariable String id) {
        log.debug("[{}] [{}] [{}] - studentId: {} reservationId: {}","reservation",UserUtil.getUser().getUsername(),"delete", studentId, id);
        Reservation reservation = Optional.ofNullable(reservationRepository.findByStudentIdAndId(studentId, id))
                .orElseThrow(()->new ResourceNotFoundException("not found reservation studentId: "+ studentId + " reservationId: " +id));
        reservationRepository.deleteById(reservation.getId());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/students/reservations")
    ResponseEntity<?> getAllReservations() {
        LocalDate now = LocalDate.now();
        LocalDateTime start = now.atTime(6,0);
        LocalDateTime end = now.plusDays(7).atTime(5,59);
        User user = Optional.ofNullable(UserUtil.getUser())
                .orElseThrow(()->new UnAuthorizationException("unAuthorization"));
        log.debug("[{}] [{}] [{}] - from: {} to: {}","reservation",UserUtil.getUser().getUsername(),"find", start, end);
        List<Reservation> reservations = reservationRepository.findAllByReservationTimeBetween(start,end);
        reservations = reservations
                .stream()
                .map(reservation -> {
                    ReservationResponse rv = new ReservationResponse();
                    BeanUtils.copyProperties(reservation, rv, "student");
                    rv.setMine(user.getUsername().equals(reservation.getStudent().getLogin()));
                    return rv;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservations);
    }
    @Data
    public static class ReservationCreateReq {
        int halfHours = 2;
        @DateTimeFormat(iso= DateTimeFormat.ISO.DATE_TIME)
        LocalDateTime reservationTime = LocalDateTime.now();
        String memo;


    }

    @Data
    public static class ReservationUpdateReq {
        int halfHours = 1;
        @DateTimeFormat(iso= DateTimeFormat.ISO.DATE_TIME)
        LocalDateTime reservationTime = LocalDateTime.now();
    }

    @Data
    public static class ReservationResponse extends Reservation{
        private boolean mine = false;
    }
}
