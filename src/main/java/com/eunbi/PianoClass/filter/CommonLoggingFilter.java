package com.eunbi.PianoClass.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import javax.servlet.http.HttpServletRequest;

@Slf4j
public class CommonLoggingFilter extends CommonsRequestLoggingFilter {
    ThreadLocal<Long> executionTime = ThreadLocal.withInitial(()->0L);
    @Override
    protected boolean shouldLog(HttpServletRequest request) {
        return !MediaType.MULTIPART_FORM_DATA_VALUE.equals(request.getContentType());
    }

    @Override
    protected void beforeRequest(HttpServletRequest request, String message) {
        executionTime.set(System.currentTimeMillis());
        log.debug("### start time: {}", executionTime.get());
        super.beforeRequest(request, message);
    }

    @Override
    protected void afterRequest(HttpServletRequest request, String message) {
        long runningTime = System.currentTimeMillis() - executionTime.get();
        log.debug("### end time : {}", System.currentTimeMillis());
        log.debug("### running time: {}", runningTime);
        super.afterRequest(request, message);
    }

    public CommonLoggingFilter() {
        super();
        setAfterMessagePrefix("### ");
        setBeforeMessagePrefix("### ");
        setIncludePayload(true);
        setIncludeQueryString(true);
        setIncludeHeaders(true);
        setMaxPayloadLength(1024 * 10);
    }
}
