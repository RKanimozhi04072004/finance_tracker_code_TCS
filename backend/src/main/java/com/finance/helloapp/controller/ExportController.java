package com.finance.helloapp.controller;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finance.helloapp.service.ExportService;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "http://localhost:3000")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @GetMapping("/csv/{userId}")
    public ResponseEntity<InputStreamResource> exportCSV(
            @PathVariable Long userId,
            @RequestParam String month) {

        ByteArrayInputStream file =
                exportService.exportMonthlyCSV(userId, month);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Monthly_Report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(file));
    }
}