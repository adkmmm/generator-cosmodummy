////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Copyright (C) <%= year %> by <%= authorName %>
///
/// This file is part of the <%= className %> project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// @file                       <%= projectPath %>/<%= className %>.cpp
/// @author                     <%= authorName %> <<%= authorEmail %>>
/// @date                       <%= date %>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <iostream>
#include "<%= className %>.h"
#include "CosmoJ2735Message.h"
#include "CosmoErr.h"
#include "CosmoHandler.h"


extern "C" {

ICosmoApp * create_app() {
    return new <%= className %>;
}

void destroy_app(ICosmoApp *app) {
    delete app;
}

}

<%= className %>::<%= className %>() {
    std::cout << "<%= className %> construct" << std::endl << std::flush;

    m_priority = AppPriority::<%= appPriority %>;
    m_version = AppVersion::<%= appVersion %>;
    m_name = "<%= className %>";
    m_description = "<%= projectDescription %>";
    m_author = "<%= authorName %>";
}

<%= className %>::~<%= className %>() {
    std::cout << "<%= className %> destruct" << std::endl << std::flush;
}

AppVersion <%= className %>::GetAppVersion() {
    return m_version;
}

std::string <%= className %>::GetName() {
    return m_name;
}

std::string <%= className %>::GetDescription() {
    return m_description;
}

std::string <%= className %>::GetAuthor() {
    return m_author;
}

AppPriority <%= className %>::GetPriority() {
    return m_priority;
}

/**
 *  This routine is the good place to
 * 
 *  1. register messages and events this app is interested in
 *  2. create its own private utilities and structures, etc.
 * 
 */
bool <%= className %>::Init() {
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
bool <%= className %>::DeInit() {
    return true;
}

void <%= className %>::OnJ2735Message(J2735_MSGPtr msgPtr) {
    std::cout << "received a message" << std::endl;
}

void <%= className %>::OnEvent(CosmoEventType event, std::string jsonStr) {
    std::cout << "received an event" << std::endl;
}

void <%= className %>::MainLoop() {
    std::cout << "main loop serviced once" << std::endl;
}
