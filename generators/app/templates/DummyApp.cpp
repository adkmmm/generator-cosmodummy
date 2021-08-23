////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Copyright (C) <%= year %> by <%= authorName %>
///
/// This file is part of the <%= appName %> project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// @file                       <%= projectPath %>/<%= appName %>.cpp
/// @author                     <%= authorName %> <<%= authorEmail %>>
/// @date                       <%= date %>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <iostream>
#include "<%= appName %>.h"
#include "CosmoJ2735Message.h"
#include "CosmoErr.h"
#include "CosmoHandler.h"


extern "C" {

ICosmoApp * create_app() {
    return new <%= appName %>;
}

void destroy_app(ICosmoApp *app) {
    delete app;
}

}

<%= appName %>::<%= appName %>() {
    std::cout << "<%= appName %> construct" << std::endl << std::flush;

    m_priority = AppPriority::<%= appPriority %>;
    m_version = AppVersion::<%= appVersion %>;
    m_name = "<%= appName %>";
    m_description = "<%= projectDescription %>";
    m_author = "<%= authorName %>";
}

<%= appName %>::~<%= appName %>() {
    std::cout << "<%= appName %> destruct" << std::endl << std::flush;
}

AppVersion <%= appName %>::GetAppVersion() {
    return m_version;
}

std::string <%= appName %>::GetName() {
    return m_name;
}

std::string <%= appName %>::GetDescription() {
    return m_description;
}

std::string <%= appName %>::GetAuthor() {
    return m_author;
}

AppPriority <%= appName %>::GetPriority() {
    return m_priority;
}

/**
 *  This routine is the good place to
 * 
 *  1. register messages and events this app is interested in
 *  2. create its own private utilities and structures, etc.
 * 
 */
bool <%= appName %>::Init() {
    int res = m_handler->RegisterV2XMessages(GetPtr(), 0x4); // register BSM only
    if(res != S_OK) {
        return false;
    }

    return true;
}

/**
 *  This routine is the good place to 
 * 
 *  1. clean up for priviate utilities
 *  
 */ 
bool <%= appName %>::DeInit() {
    return true;
}

void <%= appName %>::OnJ2735Message(J2735_MSGPtr msgPtr) {
    std::cout << "received a message" << std::endl;
}

void <%= appName %>::OnEvent(CosmoEventType event, std::string jsonStr) {
    std::cout << "received an event" << std::endl;
}

void <%= appName %>::MainLoop() {
    std::cout << "main loop serviced once" << std::endl;
}
