set(<%= appName %> "<%= appNameLower %>")

 

add_library(${<%= appName %>} MODULE
        BSMRelayApp.cpp
        )

 

target_include_directories(${<%= appName %>} PRIVATE
        ${CMAKE_SOURCE_DIR}/src
        ${CMAKE_SOURCE_DIR}/src/include
        ${CMAKE_SOURCE_DIR}/third_party/sigslot
        ${CMAKE_SOURCE_DIR}/third_party/rapidjson/include
        )

 

target_link_libraries(${<%= appName %>} PRIVATE
        cosmo_framework
        )
 