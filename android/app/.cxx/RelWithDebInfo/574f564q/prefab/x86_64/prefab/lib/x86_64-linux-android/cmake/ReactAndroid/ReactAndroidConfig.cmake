if(NOT TARGET ReactAndroid::hermestooling)
add_library(ReactAndroid::hermestooling SHARED IMPORTED)
set_target_properties(ReactAndroid::hermestooling PROPERTIES
    IMPORTED_LOCATION "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/hermestooling/libs/android.x86_64/libhermestooling.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/hermestooling/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::jsctooling)
add_library(ReactAndroid::jsctooling SHARED IMPORTED)
set_target_properties(ReactAndroid::jsctooling PROPERTIES
    IMPORTED_LOCATION "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/jsctooling/libs/android.x86_64/libjsctooling.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/jsctooling/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::jsi)
add_library(ReactAndroid::jsi SHARED IMPORTED)
set_target_properties(ReactAndroid::jsi PROPERTIES
    IMPORTED_LOCATION "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/jsi/libs/android.x86_64/libjsi.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/jsi/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::reactnative)
add_library(ReactAndroid::reactnative SHARED IMPORTED)
set_target_properties(ReactAndroid::reactnative PROPERTIES
    IMPORTED_LOCATION "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/reactnative/libs/android.x86_64/libreactnative.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/1c9225614e4d0ab975f35005d007a9db/transformed/react-android-0.80.0-release/prefab/modules/reactnative/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

