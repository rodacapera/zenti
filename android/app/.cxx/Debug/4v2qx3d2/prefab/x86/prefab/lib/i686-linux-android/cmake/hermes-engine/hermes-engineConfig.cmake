if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/e445a1960290b7126005bfe2b99e3a0b/transformed/hermes-android-0.80.2-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rhonaldcapera/.gradle/caches/8.14.1/transforms/e445a1960290b7126005bfe2b99e3a0b/transformed/hermes-android-0.80.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

