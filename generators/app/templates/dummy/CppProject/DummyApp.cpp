////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Copyright (C) <%= year %> by <%= authorName %>
///
/// This file is part of the <%= projectName %> project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// @file                       <%= projectPath %>/Dummy.cpp
/// @author                     <%= authorName %> <<%= authorEmail %>>
/// @date                       <%= date %>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <iostream>
#include "DummyApp.h"
#include "CosmoJ2735Message.h"
#include "CosmoErr.h"
#include "CosmoHandler.h"


extern "C" {

ICosmoApp * create_app() {
    return new DummyApp;
}

void destroy_app(ICosmoApp *app) {
    delete app;
}

}

DummyApp::DummyApp() {
    std::cout << "DummyApp construct" << std::endl << std::flush;

    m_priority = AppPriority::kLowest;
    m_version = AppVersion::kVersion_0_1;
    m_name = "<%= projectName %>";
    m_description = "<%= projectDescription %>";
    m_author = "<%= authorName %>";
}

DummyApp::~DummyApp() {
    std::cout << "DummyApp destruct" << std::endl << std::flush;
}

AppVersion DummyApp::GetAppVersion() {
    return m_version;
}

std::string DummyApp::GetName() {
    return m_name;
}

std::string DummyApp::GetDescription() {
    return m_description;
}

std::string DummyApp::GetAuthor() {
    return m_author;
}

AppPriority DummyApp::GetPriority() {
    return m_priority;
}

/**
 *  This routine is the good place to
 * 
 *  1. register messages and events this app is interested in
 *  2. create its own private utilities and structures, etc.
 * 
 */
bool DummyApp::Init() {
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
bool DummyApp::DeInit() {
    return true;
}

void DummyApp::OnJ2735Message(J2735_MSGPtr msgPtr) {
    std::cout << "received a message" << std::endl;
}

void DummyApp::OnEvent(CosmoEventType event, std::string jsonStr) {
    std::cout << "received an event" << std::endl;
}

void DummyApp::MainLoop() {
    std::cout << "main loop serviced once" << std::endl;
}
