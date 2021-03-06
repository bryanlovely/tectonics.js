
// The FieldInterpolation namespaces provide operations commonly used in interpolation for computer graphics
// All input are raster objects, e.g. VectorRaster or Float32Raster
var Float32RasterInterpolation = {};
Float32RasterInterpolation.lerp = function(a,b, x, result){
    ASSERT_IS_ARRAY(x, Float32Array)
    result = result || Float32Raster(x.grid);
    ASSERT_IS_ARRAY(result, Float32Array)
    for (var i = 0, li = result.length; i < li; i++) {
        result[i] = a + x[i]*(b-a);
    }
    return result;
}
Float32RasterInterpolation.lerp_fsf = function(a,b, x, result){
    ASSERT_IS_ARRAY(a, Float32Array)
    ASSERT_IS_ARRAY(x, Float32Array)
    result = result || Float32Raster(x.grid);
    ASSERT_IS_ARRAY(result, Float32Array)
    for (var i = 0, li = result.length; i < li; i++) {
        result[i] = a[i] + x[i] * (b-a[i]);
    }
    return result;
}
Float32RasterInterpolation.lerp_sff = function(a,b, x, result){
    ASSERT_IS_ARRAY(b, Float32Array)
    ASSERT_IS_ARRAY(x, Float32Array)
    result = result || Float32Raster(x.grid);
    ASSERT_IS_ARRAY(result, Float32Array)
    for (var i = 0, li = result.length; i < li; i++) {
        result[i] = a + x[i] * (b[i]-a);
    }
    return result;
}
Float32RasterInterpolation.clamp = function(x, min_value, max_value, result) {
    ASSERT_IS_ARRAY(x, Float32Array)
    result = result || Float32Raster(x.grid);
    ASSERT_IS_ARRAY(result, Float32Array)
    var x_i = 0.0;
    for (var i = 0, li = x.length; i < li; i++) {
        x_i = x[i];
        result[i] = x_i > max_value? max_value : x_i < min_value? min_value : x_i;
    }
    return result;
}
Float32RasterInterpolation.smoothstep = function(edge0, edge1, x, result) {
    ASSERT_IS_ARRAY(x, Float32Array)
    result = result || Float32Raster(x.grid);
    ASSERT_IS_ARRAY(result, Float32Array)
	var fraction;
	var inverse_edge_distance = 1 / (edge1 - edge0);
    for (var i = 0, li = result.length; i < li; i++) {
		fraction = (x[i] - edge0) * inverse_edge_distance;
		result[i] = fraction > 1.0? 1.0 : fraction < 0.0? 0.0 : fraction;
	}
	return result;
}
Float32RasterInterpolation.smooth_heaviside = function(x, k, result) {
    result = result || Float32Raster(x.grid);
    ASSERT_IS_ARRAY(x, Float32Array)
    ASSERT_IS_ARRAY(result, Float32Array)
    var exp = Math.exp;
    for (var i = 0, li = result.length; i < li; i++) {
	   result[i] = 2 / (1 + exp(-k*x[i])) - 1;
    }
    return result;
}
