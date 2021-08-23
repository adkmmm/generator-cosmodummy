#ifndef COSMO_ITS_RUNTIME_<%= appName %>_H
#define COSMO_ITS_RUNTIME_<%= appName %>_H

#include "ICosmoApp.h"

/**
 * @class <%= appName %>
 * @brief Cosmo Dummy Application 
 */
class <%= appName %> : public ICosmoApp {
public:
    <%= appName %>();

    ~<%= appName %>() override;

public:
    AppVersion GetAppVersion() override;

    std::string GetName() override;

    std::string GetDescription() override;

    std::string GetAuthor() override;

    AppPriority GetPriority() override;

    bool Init() override;

    bool DeInit() override;

    void OnJ2735Message(J2735_MSGPtr msgPtr) override;

    void OnEvent(CosmoEventType event, std::string jsonStr) override;

    void MainLoop() override;
};


#endif //COSMO_ITS_RUNTIME_<%= appName %>_H
